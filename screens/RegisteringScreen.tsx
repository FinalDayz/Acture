import React, {useState} from 'react';
import {User} from '../models/User'
import { View, StyleSheet, ScrollView, PanResponder, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Button, Alert } from 'react-native';
import colors from '../constants/colors';
import Image from 'react-native-scalable-image';
import { userInfo } from 'os';
import { Input } from '../components/input/standardInput';
import { bodyfull } from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import { stringify } from 'querystring';

const windowWidth = Dimensions.get('window').width;

export default class LoginScreen extends React.Component<{navigation:any}> {

    state={
        firstName:"",
        insertion:"",
        lastName:"",
        email:"",
        password:"",
        date:"",
        role:""
    }

    returnToLoginScreen = () => {

        this.props.navigation.navigate('Login');
    };

    saveUserData = () => {
        const user = new User(this.state.firstName, this.state.insertion, this.state.lastName, this.state.email, this.state.password);
        var role = 'user';
        this.state.role = role;
        this.registerDate();
        this.register();
    };

    registerDate = () => {
        var today = new Date();
        var days = today.getDate();
        var months = today.getMonth()+1; 
        var years = today.getFullYear();

        var day = days.toString();
        var month = months.toString();
        var year=years.toString();
        if(days<10) 
        {
            day='0'+ days;
        } 
        if(months<10) 
        {
            month='0'+months;
        } 
        var date = year + "-" + month + "-" + day;

        {() => this.setState({date:date})}
    }

    register = () => {
        console.log(this.state.firstName + ' ' + this.state.insertion + ' ' + this.state.lastName + ', ' + this.state.email, ', ' + this.state.password + ', '+ this.state.role + ', ' + this.state.date);

        bodyfull(ApiDictionary.register, {'firstname': this.state.firstName, 'tussenvoegsel': this.state.insertion, 'lastname': this.state.lastName, 'email': this.state.email, 'password': this.state.password, 'role': this.state.role, 'register_date': this.state.date}).then((data) => {
            if(!data.success) {
                Alert.alert(
                    "Succes!",
                    'Je bent geregistreerd, log nu in.',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false })
                    this.returnToLoginScreen();
            }
        }).catch(err => {
            console.log("fetch error" + err.message);
        })
    }

    render(){
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
                                    onChangeText={text => this.setState({firstName:text})}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Tussenvoegsel.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({insertion:text})}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Achternaam.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({lastName:text})}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Email.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({email:text})}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    secureTextEntry
                                    style={styles.inputText}
                                    placeholder="Wachtwoord..."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({password:text})}
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
                                onPress={this.saveUserData}>
                                <Text style={styles.loginText}>Registreer</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>     
            </ScrollView>
        )
    }
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
