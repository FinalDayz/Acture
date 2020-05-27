import React, {useState} from 'react';
import {User} from '../models/User'
import { View, StyleSheet, ScrollView, PanResponder, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import colors from '../constants/colors';
import Image from 'react-native-scalable-image';
import { userInfo } from 'os';
import { Input } from '../components/input/standardInput';
import { bodyfull } from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';

export default function LoginScreen() {

    const windowWidth = Dimensions.get('window').width;

    const [firstName, setFirstName] = useState('');
    const [insertion, setInsertion] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const saveUserData = () => {
        const user = new User(firstName, insertion, lastName, email, password);
        //console.log(firstName + ' ' + insertion + ' ' + lastName + ', ' + email, ', ' + password);
        register();
    };

    const register = () => {
        bodyfull(ApiDictionary.register, {'firstName': firstName, 'insertion': insertion, 'lastName': lastName, 'email': email, 'password': password}).then((data) => {
            if(!data.success) {
                //TODO: display succesfull and return to login.
                console.log("data verstuurt naar de backend")
            }
        }).catch(err => {
            console.log("fetch error" + err.message);
        })
    }

    
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.contentContainer}>
                            <View style={{marginBottom: 80}}>
                                {/* not a normal Image object, documentation found in: https://www.npmjs.com/package/react-native-scalable-image */}
                                <Image
                                width={windowWidth * 0.8} 
                                source={require('../assets/LGS_LOGO_WIT.png')}/>
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Voornaam.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={setFirstName}
                                    value={firstName}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Tussenvoegsel.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={setInsertion}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Achternaam.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={setLastName}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Email.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={setEmail}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    secureTextEntry
                                    style={styles.inputText}
                                    placeholder="Wachtwoord..."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={setPassword}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    secureTextEntry
                                    style={styles.inputText}
                                    placeholder="Herhaal wachtwoord..."
                                    placeholderTextColor="#003f5c"
                                    //onChangeText={setPassword2}
                                    />
                            </View>

                            <TouchableOpacity
                                style={styles.loginBtn}
                                onPress={saveUserData}>
                                <Text style={styles.loginText}>Registreer</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>     
            </ScrollView>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.primary,
        },
        contentContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: 'center',
        },

        inputView:{
            width:"80%",
            backgroundColor:"#FFFFFF",
            borderRadius:3,
            height:50,
            marginBottom:25,
            justifyContent:"center",
            padding: 24,
        },
        inputText:{
            height:50,
            color:"black"
        },
         textInput: {
            height: 40,
            borderColor: "#000000",
            borderBottomWidth: 1,
            marginBottom: 36
          },
        forgot:{
            color:"white",
            fontSize:11,
            textDecorationLine: "underline"
        },
        loginBtn:{
            width:"50%",
            backgroundColor: colors.primaryLight,
            borderRadius:8,
            height:40,
            alignItems:"center",
            justifyContent:"center",
            marginBottom:60
        },
        loginText:{
            color:"white"
        },
        RegisterText:{
            color:"white",
            marginBottom: 20,
            textDecorationLine: "underline"
        },
    });
    