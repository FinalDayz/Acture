
import React, { Props } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert, Button } from 'react-native';

import colors from '../constants/colors';
import ApiDictionary from '../constants/ApiDictionary';
import { bodyfull } from '../components/HttpClient';

export default class ChangePasswordScreen extends React.Component<{navigation:any}> {
    _isMounted: boolean;
    
    constructor(navigation: Readonly<{ navigation: any; }>) {
        super(navigation);

        this._isMounted = false;
    }

    state={
        email:"",
        password:"",
        newpassword:"",
        newpasswordconfirmation:"",
        isLoading: false,
        show: false,
        wrongInputs: false
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    ShowHideComponent = () => {
        if (this.state.show) {
          this.setState({ show: false });
        } else {
          this.setState({ show: true });
        }
      };

    ChangePassword = () => {
        this.setState({isLoading:true});
        if(this.state.newpassword === this.state.newpasswordconfirmation && this.state.newpassword.length !== 0) {
            bodyfull(ApiDictionary.changePassword, {'password': this.state.password, 'email': this.state.email, 'newpassword': this.state.newpassword}).then((data) => {
                // console.log(JSON.stringify(data))
                if(data.success === 1) {
                    this.setState({isLoading:false});
                    this.state.wrongInputs = false;
                    this.SuccesfullChange();
                } else {
                    this.state.wrongInputs = true;
                    this.setState({isLoading:false})
                }
            }).catch(err => {
                console.log("fetch error" + err.message);
                this.setState({isLoading:false})
            })
            
        this._isMounted && this.setState({
            ready: true
        })
    } else {
        this.state.wrongInputs = false;
        this.setState({isLoading:false})
        }
    };

    SuccesfullChange() {
        Alert.alert(
            "Succes!",
            'Je wachtwoord is veranderd, log nu in.',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},
            ],
            { cancelable: false })
            this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.contentContainer}>
                        <View><Text style={styles.headerText}>Wachtwoord Veranderen</Text></View>

                            {this.state.wrongInputs ? (
                               <Text style={styles.warningTest}>Verkeerde email of password</Text>
                                ) : null}

                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText} 
                                    placeholder="Email..."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({email:text})}
                                    />
                            </View>
                            
                            {this.state.wrongInputs ? (
                               <Text style={styles.warningTest}>Verkeerde email of password</Text>
                                ) : null}

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
                                    placeholder="Nieuw Wachtwoord..."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({newpassword:text})}
                                    />
                            </View>

                            <View style={styles.inputView} >
                                <TextInput
                                    secureTextEntry
                                    style={styles.inputText}
                                    placeholder="Nieuw Wachtwoord Herhalen..."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({newpasswordconfirmation:text})}
                                    />
                            </View>

                            {!this.state.isLoading ? (
                                <TouchableOpacity
                                    style={styles.changePasswordBtn}
                                    onPress={this.ChangePassword}
                                    >
                                    <Text style={styles.changePasswordText}>Verander wachtwoord</Text>
                                </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                    style={styles.changePasswordBtn}
                                    >
                                    <ActivityIndicator size="large" color={colors.textLight}/>
                                    </TouchableOpacity>
                                )}
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
        backgroundColor: colors.primary
    },
    warningTest: {
        marginBottom: 6,
        color: "red",
        fontSize: 12
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    inputView:{
        width:"80%",
        backgroundColor:colors.postBody,
        borderRadius:3,
        height:50,
        marginBottom:25,
        justifyContent:"center",
        padding: 24
    },
    inputText:{
        height:50,
        color:"black"
    },
    forgot:{
        color:"white",
        fontSize:11,
        textDecorationLine: "underline"
    },
    changePasswordBtn:{
        width:"50%",
        backgroundColor: colors.primaryLight,
        borderRadius:8,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:60
    },
    changePasswordText:{
        color:"white"
    },
    headerText:{
        margin: 40,
        fontWeight:"bold",
        fontSize: 22,
        color:"white"
    }
});
