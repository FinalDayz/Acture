import React, {useState} from "react";
import {
    Alert,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    Platform,
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView
} from "react-native";
import colors from "../constants/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import bodyless, {bodyfull} from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";
import {Category} from "../models/Category";
import {Ionicons} from "@expo/vector-icons";
import {Input} from "../components/input/standardInput";
import { Container } from "native-base";


export interface Props {
    data:any
}

interface State {
    title: string
    titleValid: boolean
    text: string
    textValid: boolean
    categoryId: number
    categoryValid: boolean
    categories: Array<Category>
    image: string
    imageName: string

    isLoading: boolean

    isValid: boolean,

    editMode: boolean

}

const isSmallWindow = (Dimensions.get('window').height > 450 && Dimensions.get('window').height < 550)

export default class PostAddScreen extends React.Component<Props, State> {
    state: State;


    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            isLoading: false,
            isValid: false,
            title: '',
            titleValid: true,
            text: '',
            textValid: true,
            categoryId: 0,
            categoryValid: true,
            categories: [],
            image: '',
            imageName: '',

            editMode: false
        }
    }

    componentDidMount() {
        this.getAllCategories();
        this.getPermissionAsync();
        // this.getStyle();
    }

    getPermissionAsync = async () => {
        // @ts-ignore
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                base64: true,
                aspect: [4, 3],
                quality: 0.01,

            });
            if (result && !result.cancelled) {
                console.log(result.uri);
                const bas64 = result.base64;
                if (bas64) {
                    this.setState({image: bas64.toString()})
                    this.setState({imageName: result.uri.substring(result.uri.lastIndexOf("/") + 1)})
                }

            }

        } catch (E) {
            console.log(E);
        }
    };

    checkTitleInput(title: string) {
        this.setState({
            titleValid: (title.trim().length > 0),
            title: title
        });
    }
    
    checkTextInput(text: string) {
        this.setState({
            textValid: (text.trim().length > 0),
            text: text
        });
    }

    checkCategoryInput(id: number) {
        this.setState({
            categoryValid: (id != 0),
            categoryId: id
        });
    }

    updateValid() {
        this.checkTitleInput(this.state.title);
        this.checkTextInput(this.state.text);
        this.checkCategoryInput(this.state.categoryId)

        this.setState({isValid: (
            this.state.titleValid
            && this.state.textValid
            && this.state.categoryValid
        )});
    }

    checkValid(): boolean {
        this.updateValid();
        if (
            !this.state.isValid
        ) {
            Alert.alert(
                'Invoer onjuist',
                'Controleer of alle velden correct zijn ingevuld.',
                [{text: 'OK'}])
            return false;
        }
        return true;
    }

    addPost = () => {
        if (!this.state.isLoading) {
            this.state.isLoading = true;
            bodyfull(ApiDictionary.addPost, {
                'text': this.state.text,
                'title': this.state.title,
                'image': this.state.image,
                'categoryId': this.state.categoryId
            }).then((data) => {
                    if (data.success === 1) {
                        console.log("INSERTED")
                    }
                    this.setState({isLoading : false})
                }
            ).catch(err => {
                console.log(err)
                this.setState({isLoading:false})
            });
        }
    }

    getAllCategories = () => {
        if (!this.state.isLoading) {
            this.state.isLoading = true;
            bodyless(ApiDictionary.getAllCategories)
                .then(
                    (result) => {
                        this.setState({
                            categories: result.data
                        });
                        this.setState({
                            isLoading: false
                        });
                    },
                ).catch(err => {
                console.log(err);
                this.setState({isLoading: false})
            })
        } else {
            return null
        }
    }

    submitPostHandler(){
        if (!this.checkValid) {
            return
        }
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.componentContainerBig} >
                    <View style={styles.inputBox}>
                        <TextInput
                            style={ styles.input }
                            placeholder="Titel..."
                            value={this.state.title}
                            onChangeText={title => this.checkTitleInput(title)}
                            autoCorrect
                            returnKeyType='next'
                        />
                        {!this.state.titleValid &&
                            <Text style={styles.error}>Veld mag niet leeg zijn</Text>
                        }
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={ styles.input }
                            placeholder="Beschrijving..."
                            value={this.state.text}
                            onChangeText={text => this.checkTextInput(text)}
                            autoCorrect
                            returnKeyType='next'
                            multiline={true}
                            numberOfLines={5}
                        />
                        {!this.state.textValid &&
                        <Text style={styles.error}>Veld mag niet leeg zijn</Text>
                        }
                    </View>

                    <View style={styles.inputBox}>
                        <RNPickerSelect
                            style={{
                                placeholder: {
                                    color: 'black',
                                    fontSize: 12,
                                },
                            }}
                            placeholder={{
                                label: 'Categorie selecteren',
                                value: 0,
                                color: '#D3D3D3'
                            }}
                            onValueChange={id => this.checkCategoryInput(id)}
                            items={this.state.categories.map(obj => ({
                                label: obj.name, value: obj.categoryId
                            }))}
                        />
                        <View style={styles.separator}></View>
                        {!this.state.categoryValid &&
                        <Text style={styles.error }>Kies een categorie</Text>
                        }
                    </View>

                    {/*<View style={{*/}
                    {/*    marginTop: 30,*/}
                    {/*    marginHorizontal: 10,*/}
                    {/*    flexDirection: 'row',*/}
                    {/*    justifyContent: 'space-between'*/}
                    {/*}}>*/}

                    {/*    <Ionicons style={{width: "35%", paddingTop: 5}} onPress={this._pickImage} name='md-camera'*/}
                    {/*              size={27} color={"grey"}/>*/}
                    {/*    <Text style={{width: "65%", paddingTop: 12, marginLeft: 13}}>*/}
                    {/*        {this.state.imageName.slice(this.state.imageName.length - 10)}*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.line}></View>*/}
                </View>
            </ScrollView>
        );
    }

    //options for header bar
    static navigationOptions = (navData:any) => {
        return {headerTitle: 'Bericht plaatsen'}
    };

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
        padding: 28,
    },
    warningTest: {
        marginBottom: 6,
        color: "red",
        fontSize: 12
    },
    componentContainerBig: {
        margin: 20,
        backgroundColor: '#F4F4F4',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    componentContainerSmall: {
        paddingVertical: 5,
        width: '100%',
        height: 400,
        // backgroundColor: '#F4F4F4',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
        marginHorizontal: 10
    },
    inputBox: {
        width: '100%',
        // backgroundColor: 'blue',
        paddingVertical: 5,
        paddingHorizontal: 10
    },

    input: {
        textAlignVertical: 'top',
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },

    error: {
        color: '#AA0000',
        fontSize: 12
    },

    separator: {
        borderTopColor: '#D3D3D3',
        borderTopWidth: 1
    },

    categoryBox: {
        backgroundColor: colors.textLight,
        height: 30,
        borderRadius: 3,
        padding: 5,
        marginHorizontal: 10

    },
    buttonFotoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


        marginTop: Dimensions.get('window').height > 600 ? 30 : 5,

    },
    addPhotoButtonContainer: {
        width: 50,
        height: 45,
        color: "white",
        backgroundColor: colors.primaryLight,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    photoText: {
        color: "white",
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    submitButton: {

        width: 150,
        height: 39,
        color: "white",
        backgroundColor: colors.primaryLight,
        borderRadius: 10,
        marginTop: Dimensions.get('window').height > 600 ? 50 : 35,
        marginLeft: Dimensions.get('window').width > 50 ? 185 : 150,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    submitText: {
        color: "white",
        justifyContent: "center",
        paddingTop: 10,
        paddingLeft: "5%",
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: "-0.5%"
    },


    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        width: 250,
        height: 60,
        backgroundColor: '#3740ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 12
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    },
    belowButtons: {
        borderColor: "#20232a",
        paddingHorizontal: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 30,
    }
});
