// import React from "react";
// import {Image, StyleSheet, TextInput, TouchableOpacity, View, Text, Dimensions} from "react-native";
// import InputScrollView from "react-native-input-scroll-view";
// import colors from "../constants/colors";
// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
// import RNPickerSelect from 'react-native-picker-select';
//
//
// import Constants from 'expo-constants';
// import {endianness} from "os";
// import * as http from "http";
// import bodyless, {bodyfull} from "../components/HttpClient";
// import ApiDictionary from "../constants/ApiDictionary";
// import {Category} from "../models/Category";
// // import RNFetchBlob from 'react-native-fetch-blob';
//
// export interface Props {
// }
//
// interface State {
//
//     title: string,
//     text: string,
//     textareaHeight: number,
//     image: string,
//     hasError: boolean,
//     date: null,
//     categories : Array<Category>
// }
// export class AdminAddScreen extends React.Component<Props, State> {
//     state: State;
//
//
//     // const fs = RNFetchBlob.fs
//
//     constructor(props: Props, state: State) {
//         super(props);
//         this.state = {
//             ...state,
//             title: "",
//             text: "",
//             textareaHeight: 250,
//             image: "",
//             hasError: false,
//             categories: []
//
//         }
//         // selectedCategory
//
//         this._getAllCategories()
//         console.log( this._getAllCategories())
//     }
//
//
//
//
//     // postToAdd = {
//     //    text: this.state.text,
//     //    title: this.state.title,
//     //    image: this.state.image,
//     //    userId: 1,
//     //    categoryId: 1};
//
//
//
//     componentDidMount() {
//         this.getPermissionAsync();
//     }
//
//     getPermissionAsync = async () => {
//         // @ts-ignore
//         if (Constants.platform.ios) {
//             const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//             if (status !== 'granted') {
//                 alert('Sorry, we need camera roll permissions to make this work!');
//             }
//         }
//     };
//
//     _pickImage = async () => {
//         try {
//             let result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.All,
//                 allowsEditing: true,
//                 aspect: [4, 3],
//                 quality: 1,
//             });
//             if (!result.cancelled) {
//                 this.setState({ image: result.uri });
//                 // let response = await fs.readFile(uri, 'base64')
//             }
//
//             console.log(result);
//         } catch (E) {
//             console.log(E);
//         }
//     };
//
//
//     _addPost = () => {
//         console.log("pressed")
//         //TODO: fix that this clicks twice during the memory leak preventing
//         bodyfull(ApiDictionary.addPost, {
//             'text': this.state.text,
//             'title': this.state.title,
//             'image': this.state.image,
//             'userId': 1,
//             'categoryId': 1 }).then((data) => {
//             if(data.success === 1) {
//                 console.log("INSERTED")
//             }
//
//         });
//     }
//
//     _getAllCategories = () => {
//         bodyless(ApiDictionary.getAllCategories).then((data) => {
//         this.setState({
//             categories: data
//         })
//             if(data.success === 1) {
//                 console.log("INSERTED")
//             }
//         });
// }
//
//
//
//     render(){
//
//         return (
//             <InputScrollView style = {styles.screen}>
//                 <TextInput
//                     style={styles.titleBox}
//                     placeholder="Titel..."
//                     // placeholderTextColor= "#C4C4C4"
//                     placeholderTextColor= "#8e8e8e"
//                     value={this.state.title}
//                     onChangeText={(title: any) => this.setState({ title })}/>
//                 <TextInput />
//                 <TextInput
//                     style={{backgroundColor:colors.textLight,
//                         width:'100%',
//                         borderRadius:3,
//                         padding: 10,
//                         height: this.state.textareaHeight}}
//                     placeholder="Beschrijving..."
//                     // placeholderTextColor= "#C4C4C4"
//                     placeholderTextColor= "#8e8e8e"
//                     value={this.state.text}
//                     onChangeText={text => this.setState({ text })}
//                     multiline/>
//                     <View style={ styles.categoryBox}>
//                         <RNPickerSelect
//                            style={styles.pickerSelect}
//                            placeholder={{
//                                label: 'Categorie..'}}
//                             onValueChange={(value) => console.log(value)}
//                            items={this.state.categories.map(obj =>
//                                [{
//                                    label: obj.name,
//                                    value: obj.categoryId,
//
//                                }]
//                            )}
//                         />
//                     </View>
//
//                 <View style={styles.buttonFotoContainer}>
//                     <TouchableOpacity onPress={this._pickImage} style={styles.addPhotoButtonContainer}>
//                         {/*<Text style={styles.photoText}></Text>*/}
//                         <Image
//                             style={{width: '60%', height: '60%',marginRight:"7%", flexDirection: 'row', justifyContent: "center", alignItems:"center"}}
//                             source={require('../assets/add_photo.png')}
//                         />
//                     </ TouchableOpacity>
//                     <Image source={{ uri: this.state.image }}
//                            style={{ width: 75, height: 75}} />
//                 </View>
//
//                 <TouchableOpacity onPress={this._addPost} style={styles.submitButton} >
//
//                     <Text style={styles.submitText}> Toevoegen </Text>
//
//                     <Image
//                         style={{width: 35, height: 30, marginTop:5, marginRight:15}}
//                         source={require('../assets/done.png')}
//                     />
//                 </ TouchableOpacity>
//
//             </InputScrollView>
//         );
//     }
//
// }
//
// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         backgroundColor: colors.primary,
//         padding: 50,
//         paddingTop: 100
//     },
//     titleBox:{
//         backgroundColor:colors.textLight,
//         width:'100%',
//         borderRadius:3,
//         padding: 10,
//
//     },
//     pickerSelect: {
//         // placeholderTextColor: "black"
//     },
//
//     categoryBox:{
//         backgroundColor:colors.textLight,
//         width:'100%',
//         borderRadius:3,
//         padding: 10,
//         marginTop: 25,
//
//     },
//     buttonFotoContainer:{
//         flexDirection: 'row',
//         justifyContent:'space-between',
//         alignItems:'center',
//
//
//         marginTop:Dimensions.get('window').height > 600? 30 : 5,
//
//     },
//     addPhotoButtonContainer:{
//         width: 50,
//         height: 45,
//         color: "white",
//         backgroundColor: colors.primaryLight,
//         borderRadius: 10,
//         // marginTop:Dimensions.get('window').height > 600? 30 : -500,
//         flexDirection: 'row',
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     photoText:{
//         color: "white",
//         paddingTop:10,
//         paddingLeft: 10,
//         fontSize:20,
//         fontWeight: 'bold'
//     },
//     submitButton:{
//
//         width: 150,
//         height: 39,
//         color: "white",
//         backgroundColor: colors.primaryLight,
//         borderRadius: 10,
//         marginTop:Dimensions.get('window').height > 600? 50 : 35,
//         marginLeft: Dimensions.get('window').width > 50? 185 : 150,
//         flexDirection: "row",
//         justifyContent: "space-between"
//     },
//     submitText:{color: "white",
//         justifyContent: "center",
//         paddingTop:10,
//         paddingLeft: "5%",
//         fontSize:20,
//         fontWeight:'bold',
//         marginLeft:"-0.5%"},
//
//
//
//     container: {
//         flex: 1,
//         padding: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff'
//     },
//     button: {
//         width: 250,
//         height: 60,
//         backgroundColor: '#3740ff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 4,
//         marginBottom:12
//     },
//     buttonText: {
//         textAlign: 'center',
//         fontSize: 15,
//         color: '#fff'
//     }
//     // descriptionBox:{
//     //     backgroundColor:colors.inputfieldLight
//     //     width:'100%',
//     //     borderRadius:3,
//     //     padding: 10,
//     //
//     // }
//
// });
