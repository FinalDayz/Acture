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
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Button
} from "react-native";
import colors from "../constants/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import bodyless, {bodyfull} from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Category} from "../models/Category";
import {Ionicons} from "@expo/vector-icons";
// import {error} from "util";
import {Input} from "../components/input/standardInput";
import { Container } from "native-base";
import { HttpHelper } from "../components/HttpHelper";
import { User } from "../models/User";


export interface Props {
    navigation:any
}

interface State {
    postId: string
    title: string
    titleValid: boolean
    text: string
    textValid: boolean
    categoryId: number
    categoryValid: boolean
    startupId: number
    startupValid: boolean
    categories: Array<Category>
    startups: Array<any>
    image: string
   
    imageName: string
    eventName: string
    eventCity: string
    eventAddress: string
    eventDate: Date
    eventPrice: string

    isLoading: boolean

    isValid: boolean,

    datePickerVisibility: boolean

    editMode: boolean

}
const user = User.getLoggedInUser();

export default class PostAddScreen extends React.Component<Props, State> {
    state: State;


    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            isLoading: false,
            isValid: false,
            postId: '',
            title: '',
            titleValid: true,
            text: '',
            textValid: true,
            categoryId: 0,
            categoryValid: true,
            startupId: 0,
            startupValid: true,
            image: '',
            imageName: '',
            eventName: '',
            eventCity: '',
            eventAddress: '',
            eventDate: new Date(),
            eventPrice: 'Gratis',
            
            categories: [],
            startups: [],

            datePickerVisibility: false,

            editMode: false
        }


    }

    componentDidMount() {
        this.getPermissionAsync();
        this.getAllCategories();
        if (this.props.navigation.state.params.edit) {
            headerMessage = 'Bericht wijzigen';
            this.fillStateOnEdit(this.props.navigation.state.params.data);
        }
    }

    fillStateOnEdit(data: any) {
        console.log("sfsg");
        this.setState({
            postId: data.postId,
            title: data.title,
            text: data.text,
            categoryId: data.categoryId,

            editMode: true
        }, () => {
            if (this.state.categoryId === 4) {
                this.setState({
                    eventName: data.name,
                    eventCity: data.city,
                    eventAddress: data.adress,
                    eventDate: new Date(data.date),
                })
            }
        });
    }

    prepareDate(date: Date) {
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        return year + '-' + month + '-' + day;
    }

    parseDate(date: Date) {
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        return day + '/' + month + '/' + year;
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
                const base64 = result.base64;
                if(base64 && base64.length <= 20000){
                    this.setState({image: base64.toString()})
                    this.setState({imageName: result.uri.substring(result.uri.lastIndexOf("/")+1)})
                }
                else {
                    Alert.alert('Kon afbeelding niet laden',
                        'Probeer een abfeelding van een kleiner formaat...',
                        [{text: 'OK'}])
                }
            }

        } catch (E) {
            console.log(E);
        }
    };

    deleteImage() {
        this.setState({
            image: '',
            imageName: ''
        })
    }


    makeData() {
        let startupId = null;
        if (this.state.categoryId === 1) {
            startupId = this.state.startupId;
        }

        const data = {
            postId: this.state.postId,
            title: this.state.title,
            text: this.state.text,
            categoryId: this.state.categoryId,
            image: this.state.image,
            startupId: startupId,
            eventName: this.state.eventName,
            eventCity: this.state.eventCity,
            eventAddress: this.state.eventAddress,
            eventDate: this.prepareDate(this.state.eventDate),
            eventPrice: this.state.eventPrice
        }
        return data;
    }

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

    checkStartupInput(id: number) {
        this.setState({
            startupValid: (id != 0),
            startupId: id
        })
    }

    updateValid() {
        // Controleer alle velden
        this.checkTitleInput(this.state.title);
        this.checkTextInput(this.state.text);
        this.checkCategoryInput(this.state.categoryId)
        this.checkStartupInput(this.state.startupId)



        let validity = (
            this.state.titleValid
            && this.state.textValid
            && this.state.categoryValid
        )

        // Alleen als categorie startup is, wordt startupId gevalideerd
        if (this.state.categoryId === 1 && !this.state.startupValid) {
            validity = false
        }

        this.setState({isValid: validity}, () => {
            if (
                !this.state.isValid
            ) {
                Alert.alert(
                    'Invoer onjuist',
                    'Controleer of alle velden correct zijn ingevuld.',
                    [{text: 'OK'}])
                return;
            }
            else {
                if (this.state.editMode) {
                    this.editPost(this.makeData());
                } else {
                    this.addPost(this.makeData());
                }
            }
        });
    }

    submitHandler() {
        this.updateValid() 

    }


    addPost(data: any) {
        if (!this.state.isLoading) {
            this.setState({isLoading: true}, () => {
                bodyfull(ApiDictionary.addPost, {data}
                ).then((result) => {
                        if (result.success === 1) {
                            this.successMessage();
                        }
                        else {
                            this.failMessage()
                        }
                    }
                ).catch(err => {
                    console.log(err)
                    this.setState({isLoading:false}, () => {
                        this.failMessage()
                    })
                });
            })
        }
    }

    editPost(data: any) {
        if (!this.state.isLoading) {
            this.setState({isLoading: true}, () => {
                bodyfull(ApiDictionary.editPost, {data}
                ).then((result) => {
                        if (result.success === 1) {
                            this.setState({isLoading : false}, () => {
                                this.successMessage()
                            })
                        }
                        else {
                            this.failMessage()
                        }
                    }
                ).catch(err => {
                    console.log(err)
                    this.setState({isLoading:false}, () => {
                        this.failMessage()
                    })
                });
            })
        }
    }

    failMessage() {
        Alert.alert(
            'Er is een fout opgetreden',
            'Probeer het later opnieuw...',
            [{text: 'OK'}])
    }

    successMessage() {
        Alert.alert(
            'Succes!',
            'Uw post is succesvol opgeslagen. Ververs om de wijzigingen te zien.',
            [{text: 'OK', onPress: () => this.props.navigation.pop()}],)
    }

    getAllCategories () {
        if (!this.state.isLoading) {
            this.state.isLoading = true;
            bodyless(ApiDictionary.getAllCategories)
                .then(
                    (result) => {
                        this.setState({
                            isLoading: false,
                            categories: result.data
                        }, () => {
                            this.getAllStartups();
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

    getAllStartups() {
        if (!this.state.isLoading) {
            this.setState({isLoading: true}, ()=> {
                bodyless(HttpHelper.addUrlParameter(
                    ApiDictionary.getStartupsByUserId, [User.getUserId()]))
                    .then((result) => {
                        this.setState({
                            isLoading: false,
                            startups: result.data
                        });
                    }).catch(err => {
                    console.log(err);
                    this.setState({isLoading: false})
                })

            })
        } else {
            return null
        }
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.componentContainerBig} >
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Titel</Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="Titel..."
                            value={this.state.title}
                            onChangeText={title => this.checkTitleInput(title)}
                            returnKeyType='next'
                            maxLength={45}
                        />
                        {!this.state.titleValid &&
                            <Text style={styles.error}>Veld mag niet leeg zijn</Text>
                        }
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Beschrijving</Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="Beschrijving..."
                            value={this.state.text}
                            onChangeText={text => this.checkTextInput(text)}
                            returnKeyType='next'
                            multiline={true}
                            numberOfLines={5}
                        />
                        {!this.state.textValid &&
                        <Text style={styles.error}>Veld mag niet leeg zijn</Text>
                        }
                    </View>

                    {!this.state.editMode &&
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Categorie</Text>
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
                        <Text style={styles.error}>Kies een categorie</Text>
                        }
                    </View>
                    }

                    {!this.state.editMode && this.state.categoryId === 1 &&
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Startup</Text>
                        <RNPickerSelect
                            style={{
                                placeholder: {
                                    color: 'black',
                                    fontSize: 12,
                                },
                            }}
                            placeholder={{
                                label: 'Startup selecteren',
                                value: 0,
                                color: '#D3D3D3'
                            }}
                            onValueChange={id => this.checkStartupInput(id)}
                            items={this.state.startups.map(obj => ({
                                label: obj.name, value: obj.startupId
                            }))}
                        />
                        <View style={styles.separator}></View>
                        {!this.state.startupValid &&
                        <Text style={styles.error }>Kies een startup</Text>
                        }
                    </View>
                    }

                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Afbeelding</Text>
                        <View style={{padding: 10, borderBottomColor: '#D3D3D3', borderBottomWidth: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                {this.state.imageName === '' ? (
                                    <Ionicons
                                        style={{width: "35%", paddingTop: 5, flex: 1}}
                                        onPress={this.pickImage.bind(this)}
                                        name='md-camera' size={27} color={"grey"}/>
                                ) : (
                                    <Ionicons style={{width: '35%', paddingTop: 5, flex: 1}}
                                              onPress={this.deleteImage.bind(this)}
                                              name='md-trash' size={27} color={"grey"}/>
                                )}
                                <Text style={{paddingTop: 12, marginLeft: 13, flex: 7, textAlign: 'right', }}
                                      numberOfLines={1}
                                      ellipsizeMode={'head'}
                                >
                                    {this.state.imageName}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {this.state.categoryId === 4 &&
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Naam evenement</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Naam..."
                            value={this.state.eventName}
                            onChangeText={name => this.setState({eventName: name})}
                            returnKeyType='next'
                            maxLength={45}
                        />
                    </View>
                    }

                    {this.state.categoryId === 4 &&
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Locatie</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Adres..."
                            value={this.state.eventAddress}
                            onChangeText={address => this.setState({eventAddress: address})}
                            returnKeyType='next'
                            maxLength={50}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Plaats..."
                            value={this.state.eventCity}
                            onChangeText={city => this.setState({eventCity: city})}
                            returnKeyType='next'
                            maxLength={30}
                        />
                    </View>
                    }

                    {this.state.categoryId === 4 &&
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Datum evenement</Text>
                        <TouchableOpacity
                            style={{padding: 10}}
                            onPress={() => {this.toggleDatePicker()}}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Ionicons style={{width: '35%', paddingTop: 5, flex: 1}}
                                          name='md-calendar' size={30} color={"grey"}/>
                                <Text style={{paddingTop: 12, marginLeft: 13, flex: 7, textAlign: 'right', }}
                                      numberOfLines={1}
                                      ellipsizeMode={'head'}
                                >{this.parseDate(this.state.eventDate)}</Text>
                            </View>
                            <DateTimePickerModal
                                isVisible={this.state.datePickerVisibility}
                                mode="date"
                                onConfirm={(date) => {this.setState({
                                    eventDate: date,
                                    datePickerVisibility: false
                                })}}
                                onCancel={() => {
                                    this.setState({datePickerVisibility: false})
                                }}/>
                        </TouchableOpacity>
                        <View style={styles.separator}></View>
                    </View>
                    }

                    {this.state.categoryId === 4 &&
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Kosten toegang</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Kosten..."
                            value={this.state.eventPrice}
                            onChangeText={price => this.setState({eventPrice: price})}
                            returnKeyType='next'
                            maxLength={10}
                        />
                    </View>
                    }

                    {this.state.editMode? (
                        <Button title={'Wijzigen'} onPress={this.submitHandler.bind(this)}/>
                    ) : (
                        <Button title={'Opslaan'} onPress={this.submitHandler.bind(this)}/>
                    ) }
                </View>
            </ScrollView>
        );
    }

    toggleDatePicker() {
        this.setState({
            datePickerVisibility: !this.state.datePickerVisibility
        }, () => {
            this.forceUpdate()
        })
    }

    //options for header bar
    static navigationOptions = (navData:any) => {
        return {headerTitle: headerMessage}
    };

}
let headerMessage = 'Bericht plaatsen'

//options for image picker
const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: headerMessage}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
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
        paddingVertical: 20,
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
        paddingHorizontal: 10,
    },
    headLine: {
        fontStyle: 'italic',
        fontWeight: "bold",
        flex: 10,
        marginRight: 1
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
