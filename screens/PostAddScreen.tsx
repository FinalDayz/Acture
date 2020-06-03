import React from "react";
import {Image, StyleSheet, TextInput, TouchableOpacity, View, Text, Dimensions, Platform} from "react-native";
import InputScrollView from "react-native-input-scroll-view";
import colors from "../constants/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import RNPickerSelect from 'react-native-picker-select';
// import RNFetchBlob from 'rn-fetch-blob'
// import RNFetchBlob from 'react-native-fetch-blob'
import Constants from 'expo-constants';
import {endianness} from "os";
import * as http from "http";
import bodyless, {bodyfull} from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";
import {Category} from "../models/Category";
import {Post} from "../models/Post";
import {User} from "../models/User";
import {ImageInfo} from "expo-image-picker/build/ImagePicker.types";
// import any = jasmine.any;
// import ImgToBase64 from 'react-native-image-base64';
import { FormLabel} from 'react-native-elements'

// import RNFetchBlob from 'react-native-fetch-blob';
const fileUpload = require('fuctbase64');

export interface Props {
}

interface State {
    textareaHeight: number,
    hasError: boolean,
    categories: Array<Category>,

    title: string
    text: string
    categoryId: number
    image: string
    // image: Blob

}

// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;

// var ReadImageData = require('NativeModules').ReadImageData;


export default class PostAddScreen extends React.Component<Props, State> {
    state: State;


    constructor(props: Props, state: State) {
        super(props);

        // {this.state.post.title}   .post.title)}

        this.state = {
            ...state,
            textareaHeight: 250,
            // image: "",
            hasError: false,
            categories: [],

            title: '',
            text: '',
            categoryId: 0,
            image: ''

        }

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
                console.log(result);
                const bas64 = result.base64;
                if(bas64){
                    this.setState({image: bas64.toString()});
                }

            }

        } catch (E) {
            console.log(E);
        }
    };


    _addPost = () => {
        {
            console.log(this.state.image.substr(0, 300));


            // create the post object and store the state values in here
            fetch("http://192.168.178.32:3000/api/feed/addPost", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'text': this.state.text,
                    'title': this.state.title,
                    'image': this.state.image,
                    'userId': 1,
                    'categoryId': this.state.categoryId
                })
            })
                .then(res => res.json())
                .then((data) => {
                        if (data.success === 1) {
                            console.log("INSERTED")
                        }
                    }
                );
        }
    }

    _getAllCategories() {
        {
            fetch("http://192.168.178.32:3000/api/feed/getAllCategories")
                .then(res => res.json())
                .then(
                    (result: { data: Array<Category> }) => {
                        // console.log(result)
                        this.setState({
                            categories: result.data
                        });
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
        // bodyless(ApiDictionary.getAllCategories).then((data: any) => {
        // this.setState({
        //     categories: data
        // })
        //     if(data.success === 1) {
        //         console.log("INSERTED")
        //     }
        // });
    }


    render() {

        // @ts-ignore
        return (
            <InputScrollView style={styles.screen}>
                <FormLabel>Name</FormLabel>
                <TextInput
                    style={styles.titleBox}
                    placeholder="Titel..."
                    // placeholderTextColor= "#C4C4C4"
                    placeholderTextColor="#8e8e8e"
                    value={this.state.title}
                    onChangeText={(title) => this.setState({title: title})}/>
                <TextInput/>
                <TextInput
                    style={{
                        backgroundColor: colors.textLight,
                        width: '100%',
                        borderRadius: 3,
                        padding: 10,
                        height: this.state.textareaHeight
                    }}
                    placeholder="Beschrijving..."
                    // placeholderTextColor= "#C4C4C4"
                    placeholderTextColor="#8e8e8e"
                    value={this.state.text}
                    onChangeText={text => this.setState({text: text})}
                    multiline/>
                <View style={styles.categoryBox}>
                    <RNPickerSelect
                        style={styles.pickerSelect}
                        placeholder={{
                            label: 'Categorie..'
                        }}
                        onValueChange={id => this.setState({categoryId: id})}
                        items={this.state.categories.map(obj =>
                            ({label: obj.name, value: obj.categoryId})
                        )}
                    />
                </View>

                <View style={styles.buttonFotoContainer}>
                    <TouchableOpacity onPress={this._pickImage} style={styles.addPhotoButtonContainer}>
                        {/*<Text style={styles.photoText}></Text>*/}
                        <Image
                            style={{
                                width: '60%',
                                height: '60%',
                                marginRight: "7%",
                                flexDirection: 'row',
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            source={require('../assets/add_photo.png')}
                        />
                    </ TouchableOpacity>
                    {(this.state.image == '') ? undefined : <Image source={{uri: "data:image/png;base64," + this.state.image}}
                                                                   style={{width: 125, height: 125}}/>}
                </View>

                <TouchableOpacity onPress={this._addPost} style={styles.submitButton}>

                    <Text style={styles.submitText}> Toevoegen </Text>

                    <Image
                        style={{width: 35, height: 30, marginTop: 5, marginRight: 15}}
                        source={require('../assets/done.png')}
                    />
                </ TouchableOpacity>

            </InputScrollView>
        );
    }

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 50,
        paddingTop: 100
    },
    titleBox: {
        backgroundColor: colors.textLight,
        width: '100%',
        borderRadius: 3,
        padding: 10,

    },
    pickerSelect: {
        // placeholderTextColor: "black"
    },

    categoryBox: {
        backgroundColor: colors.textLight,
        width: '100%',
        borderRadius: 3,
        padding: 10,
        marginTop: 25,

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
    }
    // descriptionBox:{
    //     backgroundColor:colors.inputfieldLight
    //     width:'100%',
    //     borderRadius:3,
    //     padding: 10,
    //
    // }

});
