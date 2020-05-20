import React from "react";
import {Button, StyleSheet, TextInput, TouchableOpacity, View, Text} from "react-native";
import InputScrollView from "react-native-input-scroll-view";
import colors from "../constants/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Image from "react-native-scalable-image";
import Constants from 'expo-constants';

export default class App extends React.Component {
    state = {
        text: '',
        textareaHeight: 200,
      image: null
    };

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                // alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    render(){
        const { text, textareaHeight} = this.state;
        let{image} = this.state;

        return (
            <InputScrollView style = {styles.screen}>
                <TextInput
                    style={styles.titleBox}
                    placeholder="Titel..."
                    placeholderTextColor="#003f5c"/>
                <TextInput />
                <TextInput
                    // style={styles.descriptionBox}
                    style={{backgroundColor:colors.inputfieldLight,
                        width:'100%',
                        borderRadius:3,
                        padding: 10,
                        height: textareaHeight}}
                    placeholder="Beschrijving..."
                    placeholderTextColor="#003f5c"
                    // style={{height: textareaHeight}}
                    value={text}
                    onChangeText={text => this.setState({ text })}
                    // onContentSizeChange={this._onContentSizeChange}
                    multiline/>



                <View>
                    <TouchableOpacity onPress={this._pickImage} style={styles.photoButton}>
                        <Text style={{color:  colors.primary, justifyContent: "center"}}> Foto </Text>
                    </ TouchableOpacity>
                </View>

            </InputScrollView>
        );
    }
    // _onContentSizeChange = ({nativeEvent:event}) => {
    //     this.setState({ textareaHeight: event.contentSize.height });
    // };
}
}








const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 50,
        paddingTop: 100
    },
    titleBox:{
        backgroundColor:colors.inputfieldLight,
        width:'100%',
        borderRadius:3,
        padding: 10,

    },
    photoButton:{
        width: 176,
        height: 39,
        color: "white",
        backgroundColor: "#DDDDDD",
        borderRadius: 10,
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
        marginBottom:12
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
