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
import Constants from 'expo-constants';
import bodyless, {bodyfull} from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";
import {Category} from "../models/Category";
import {Ionicons} from "@expo/vector-icons";
import { PostModel } from "../models/PostModel";




export interface Props {

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
    canEdit: boolean
    // blogCategoryId: number

}

let canEdit: boolean = false;



export default class BlogAddScreen extends React.Component<Props, State> {


   state: State;
    title: string = ''
    data: any;



    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            ...props,
            ...state,
            isLoading: false,
            textareaHeight: 250,
            // image: "",
            hasError: false,
            categories: [],

            // title: '',
            text: '',
            categoryId: 0,
            image: '',
            imageName: '',
            // blogCategoryId: 0

        }
        // const { navigation } = this.props;
        // const data = .getParam('data','default value')
        // this.props.getParam('data','default value')
    }








   // public getPostToEdit(postId: number) {
   //                      console.log("okkk" + this.props.data.title)
   //                      this.setState({
   //                          text: this.props.data.text,
   //                          title: this.props.data.title,
   //                          categoryId: this.props.data.categoryId,
   //                          // image: result.data.image
   //                      });
   //  }







    // postToAdd = {
    //    text: this.state.text,
    //    title: this.state.title,
    //    image: this.state.image,
    //    userId: 1,
    //    categoryId: 1};


    componentDidMount() {
        // this._getAllCategories();
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
                console.log(result.uri);
                const bas64 = result.base64;
                if(bas64){
                    this.setState({image: bas64.toString()})
                    this.setState({imageName: result.uri.substring(result.uri.lastIndexOf("/")+1)})
                }

            }

        } catch (E) {
            console.log(E);
        }
    };


    _addPost = () =>
    {
        if (!this.state.isLoading) {
            bodyfull(ApiDictionary.addPost, {
                'text': this.state.text,
                'title': this.state.title,
                'image': this.state.image,
                'userId': 1,
                'categoryId': this.state.categoryId
            })
                .then(res => res.json())
                .then((data) => {
                        if (data.success === 1) {
                            console.log("INSERTED")
                        }
                    }
                );
        }else {
            return null
        }

    }

    _getAllCategories() {
        if (!this.state.isLoading) {

            this.state.isLoading = true;
            bodyless(ApiDictionary.getAllCategories)
                .then(res => res.json())
                .then(
                    (result: { data: Array<Category> }) => {
                        // console.log(result)
                        this.setState({
                            categories: result.data
                        });
                        for (let entry of this.state.categories){
                            if (entry.name = 'Blog'){
                                this.state.categoryId = entry.categoryId;
                            }
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }else {
            return null
        }
    }

    // getPostToEdit = (postId: number) => {
    //
    // }
    componentWillMount(){

        const { navigation} = this.props;
        const dataProps = navigation.getParam('data','default value')
        this.title = dataProps.title
        console.log("PROPS: " + this.title)
    }




    render() {

        
        return (
            <View style={styles.screen}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.componentContainer} >
                        <View style = {styles. titleBox}>
                            <Text style={{
                               // width:  Dimensions.get('window').width >  300 ? 30 : 5,
                                fontStyle: 'italic',
                                fontWeight: "bold",
                                width: "13%",
                                marginRight: 1
                            }}>Titel:</Text>
                            <TextInput
                                style={{
                                    width: "95%"}}
                                value={this.title}
                                // onChangeText={(title) => {this.title = title}}
                            />
                             <TextInput/>
                        </View>
                        <View style = {styles.beschrijvingBox}>
                            <TextInput
                                style={{
                                    // backgroundColor: colors.textLight,
                                    // height: this.state.textareaHeight
                                }}
                                placeholder="Beschrijving..."
                                value={this.state.text}
                                onChangeText={text => this.setState({text: text})}
                                multiline/>
                        </View>
                        <View style={ { marginTop: 30,marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Ionicons style={ { width: "35%", paddingTop: 5}} onPress={this._pickImage} name='md-camera' size={27} color={"grey"}/>
                            <Text  style={ {width : "65%",paddingTop: 12, marginLeft: 13}}>
                                {this.state.imageName.slice(this.state.imageName.length - 10)}
                            </Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.belowButtons}>
                            <Ionicons name='md-trash' size={27} color={"grey"}/>
                            <Ionicons onPress={this._addPost} name='md-send' size={27} color={"grey"}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
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
    componentContainer:{
        paddingVertical: 5,
        width: '100%',
        height: '100%',
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
    line:{
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
    beschrijvingBox:{
        // backgroundColor: 'red',
        height: "65%",
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
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
    belowButtons:{
        borderColor: "#20232a",
        paddingHorizontal: Dimensions.get('window').width >  300 ? 150 : 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:  Dimensions.get('window').height >  600 ? 30 : 10,
    }
    // descriptionBox:{
    //     backgroundColor:colors.inputfieldLight
    //     width:'100%',
    //     borderRadius:3,
    //     padding: 10,
    //
    // }

});
