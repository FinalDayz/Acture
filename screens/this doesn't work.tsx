import React, {useState} from "react";
import {
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
// import {error} from "util";
import {Input} from "../components/input/standardInput";



interface Props {
    navigation: any
}

interface State {
    textareaHeight: number,
    hasError: boolean,
    categories: Array<Category>,
    title: string
    text: string
    categoryId: number
    image: string
    imageName: string
    isLoading: boolean

    descriptionIsValid: boolean
    titleIsValid: boolean
    // componentContainer: Object
    // isSmallWindow: boolean
    // wrongInputs: boolean


    // x: string
    // y: string
    // width: string
    // height: string
}

const isSmallWindow = (Dimensions.get('window').height > 450 && Dimensions.get('window').height < 550)

export default class PostAddScreen extends React.Component<Props, State> {
    state: State;


    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            ...state,
            isLoading: false,
            textareaHeight: 250,
            // image: "",
            hasError: false,
            categories: [],

            title: '',
            text: '',
            categoryId: 0,
            image: '',
            imageName: '',

            descriptionIsValid: true,
            titleIsValid: true
            // wrongInputs: false
            // componentContainer: {},
            // isSmallWindow: Dimensions.get('window').height > 0 &&  Dimensions.get('window').height < 550

            // x: '',
            // y: '',
            // width: '',
            // height: '',

        }
        // this._getAllCategories();

    }


    // postToAdd = {
    //    text: this.state.text,
    //    title: this.state.title,
    //    image: this.state.image,
    //    userId: 1,
    //    categoryId: 1};


    componentDidMount() {
        this._getAllCategories();
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

    _pickImage = async () => {
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

    // CheckTextInput = () => {
    //     const {title, text} = this.state;
    //     if(text.trim().length == 0){
    //         this..setNativeProps({
    //             borderColor:'red',
    //             borderWidth:1
    //         });
    //         return;
    //     }
    //
    //     if(lastName.trim().length == 0){
    //         this.lastNameInput.setNativeProps({
    //             borderColor:'red',
    //             borderWidth:1
    //         });
    //         return;
    //     }
    // };
    // public myFilter = (d: Date): boolean =>
    CheckTextInput = (): boolean => {
        // const {title, text} = this.state;
        console.log(this.state.title)
        if (this.state.title.trim().length == 0) {
            this.state.titleIsValid = false
        }

        if (this.state.text.trim().length == 0) {
            this.state.descriptionIsValid = false
        }

        return (!this.state.titleIsValid || !this.state.descriptionIsValid) ? false : true;
    }

    // navigateTo() => {
    //
    //         this.props.navigation.navigate('Profile');
    // }


    _addPost = () => {
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
                        this.setState({isLoading : false})
                    }
                    // this.navigateTo();
                    // this.setState({isLoading : false})
                }
            ).catch(err => {
                console.log(err)
                this.setState({isLoading:false})
            });
        }
    }



    _getAllCategories = () => {
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

    // measureView(event: any) {
    //     console.log('event peroperties: ', event);
    //     this.setState({
    //         x: event.nativeEvent.layout.x,
    //         y: event.nativeEvent.layout.y,
    //         width: event.nativeEvent.layout.width,
    //         height: event.nativeEvent.layout.height
    //     })
    // }

    // onLayout={(event) => this.measureView(event)}

    // getStyle(){
    //     let componentContainerStyle = styles.componentContainerBig;
    //
    //     if(Dimensions.get('window').height > 450 &&  Dimensions.get('window').height < 550){
    //         componentContainerStyle = styles.componentContainerSmall;
    // }
    //  return componentContainerStyle;
// }

    // setStyleContainer(){
    //     if( this.state.isSmallWindow){
    //         this.state.componentContainer = styles.componentContainerSmall;
    //     }else {
    //         this.state.componentContainer = styles.componentContainerBig
    //     }
    // }



    render() {
        // this.setStyleContainer()
        return (
            <ScrollView style={styles.screen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/*<View style = {this.state.componentContainer}>*/}
                    <View style={styles.componentContainerBig}>
                        <View style={styles.titleBox}>
                            {/*style={this.state.titleIsValid ? styles.titleBox : styles.wrongTitleBox}*/}
                            <Text style={{
                                fontStyle: 'italic',
                                fontWeight: "bold",
                                width: "13%",
                                marginRight: 1
                            }}>Titel: </Text>
                            <TextInput
                                style={{
                                    width: "95%"
                                }}
                                value={this.state.title}
                                onChangeText={(title) => this.setState({title: title})}/>
                            <TextInput/>
                            {/*{!this.state.titleIsValid &&*/}
                            {/*<Text style={{  marginBottom: 6,*/}

                            {/*    fontSize: 12,color: "red" }}>Vul een titel in</Text>}       */}
                        </View>
                        <View
                            // style={this.state.descriptionIsValid ? styles.beschrijvingBox : styles.wrongBeschrijvingBox}
                            style= {styles.beschrijvingBox}
                        >
                            {/*<Input*/}
                            {/*errorText = 'veld mag niet leeg zijn'*/}
                            {/*type = 'default'*/}
                            {/*// ref={r=>this.beschrijvingBox=r}*/}
                            {/*placeholder="Beschrijving..."*/}
                            {/*value={this.state.text}*/}
                            {/*changed = {(text,isValid) => this.setState({text: text})}*/}
                            {/*multiline/>*/}
                            <TextInput
                                placeholder="Beschrijving..."
                                value={this.state.text}
                                onChangeText={text => this.setState({text: text})}
                                multiline/>
                            {/*{!this.state.descriptionIsValid &&*/}
                            {/*    <Text style={{ color: "red" }}>Vul een beschrijving in</Text>}*/}
                        </View>

                        <View style={styles.categoryBox}>
                            <RNPickerSelect
                                style={styles.pickerSelect}
                                placeholder={{
                                    label: 'Categorie selecteren'
                                }}
                                onValueChange={id => this.setState({categoryId: id})}
                                items={this.state.categories.map(obj =>
                                    ({label: obj.name, value: obj.categoryId})
                                )}
                            />
                        </View>
                        <View style={{
                            marginTop: 30,
                            marginHorizontal: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Ionicons style={{width: "35%", paddingTop: 5}} onPress={this._pickImage} name='md-camera'
                                      size={27} color={"grey"}/>
                            <Text style={{width: "65%", paddingTop: 12, marginLeft: 13}}>
                                {this.state.imageName.slice(this.state.imageName.length - 10)}
                            </Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.belowButtons}>
                            <Ionicons name='md-trash' size={27} color={"grey"}/>
                            {/*<Button title='nieuw' onPress = {() => this.props.navigation.navigate('PostAddScreen')}/>*/}
                            <Ionicons onPress={this._addPost}name='md-send' size={27} color={"grey"}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
        padding: 28,
        //         // paddingTop: 100
    },
    warningTest: {
        marginBottom: 6,
        color: "red",
        fontSize: 12
    },
    componentContainerBig: {
        paddingVertical: 5,
        width: '100%',
        height: 550,
        backgroundColor: '#F4F4F4',
        // backgroundColor: 'white',
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
    titleBox: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },

    wrongTitleBox: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },


    beschrijvingBox: {
        // backgroundColor: 'red',
        height: "65%",
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',

        marginHorizontal: 10
    },
    wrongBeschrijvingBox: {
        // backgroundColor: 'red',
        height: "65%",
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'red',

        marginHorizontal: 10
    },
    pickerSelect: {
        // placeholderTextColor: "black"
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
        // marginTop:Dimensions.get('window').height > 600? 30 : -500,
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
        marginTop: 30,
    }
    // descriptionBox:{
    //     backgroundColor:colors.inputfieldLight
    //     width:'100%',
    //     borderRadius:3,
    //     padding: 10,
    //
    // }

});
