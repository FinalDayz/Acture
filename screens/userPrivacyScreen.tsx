import React from "react";
import {StyleSheet, View, Text, RefreshControl, TextInput, Alert} from "react-native";
import colors from "../constants/colors";
import {CheckBox, ListItem} from "react-native-elements";
import {Hr} from "../components/Hr";
import {List} from "native-base";
import bodyless, { bodyfull } from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";


export interface Props {

}

export interface State {
    isLoading: boolean,
    settings: {
        firstname: boolean,
        lastname: boolean,
        address: boolean,
        tussenvoegsel: boolean,
        email: boolean,
        telephone: boolean,
    },
    userDetails: {
        firstname: string,
        tussenvoegsel: string,
        lastname: string,
        description: string,
        telephone: number,
        address: string
    }
    newUserDetails: {
        firstname: string,
        tussenvoegsel: string,
        lastname: string,
        description: string,
        telephone: number,
        address: string
    }
}

export default class userPrivacyScreen extends React.Component<Props, State> {
    scrollView: any;
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state,

        };
    }

    componentDidMount() {
        this.fetchSettings();
        this.fetchDetails();
    }

    fetchSettings() {
        this.setState({
            isLoading: true
        });
        bodyless(ApiDictionary.getPrivacySettings)
            .then(result => {
                const data = result.data;
                if (data.length > 0) {
                    this.setState({
                        isLoading: false,
                        settings: data
                    });
                } else {
                    this.setState({
                        isLoading: false,
                        settings: this.getDefaultSettings()
                    });
                }
            });
    }

    fetchDetails(){
        this.setState({
            isLoading: true
        });
        bodyless(ApiDictionary.getUserDetails)
            .then(result => {
                const data = result.data;
                if (Object.keys(data).length > 0) {
                    this.setState({
                        isLoading: false,
                        userDetails: data,
                        newUserDetails: data
                    });
                } else {
                    this.setState({
                        isLoading: false
                    });
                }
            });
    }

    postDetails(){
        bodyfull(ApiDictionary.updateUserDetails, this.state.newUserDetails).then((data) => {
            if(data.success) {
                Alert.alert(
                    'Details geupdate',
                    "Je details zijn bijgewerkt",
                    [
                        {
                            text: 'OK',
                            onPress: () => this.fetchDetails(),
                            style: 'cancel'
                        },
                    ],
                    {cancelable: false}
                );
            }
        }).catch(err => {
            console.log("fetch error" + err.message);
        })
    }

    postDetailsPressed(){
        if(this.state.userDetails == this.state.newUserDetails){
            this.detailsNotOk();
        } else {
                this.detailsOk();
        }
    }

    detailsOk(){
        Alert.alert(
            'Details updaten',
            "Weet u zeker dat u de ingevoerde gegevens wilt opslaan?"
            ,
            [
                {
                    text: 'Wijzigen',
                    onPress: () => this.postDetails(),
                },
                {
                    text: 'Annuleren',
                    style: 'cancel'
                },
            ],
            {cancelable: false}
        );
    }

    detailsNotOk(){
        Alert.alert(
            'Details updaten',
            "Er is niets veranderd, probeer het nog eens",
            [
                {
                    text: 'Probeer het nogmaals',
                    style: 'cancel'
                },
            ],
            {cancelable: false}
        );
    }

    getDefaultSettings(): {
        firstname: boolean,
        lastname: boolean,
        address: boolean,
        tussenvoegsel: boolean,
        email: boolean,
        telephone: boolean,
    } {
        return {
            firstname: true,
            lastname: true,
            address: true,
            tussenvoegsel: true,
            email: true,
            telephone: true
        };
    }

    pressedCheckbox(setting: 'firstname'| 'lastname'| 'address'|'tussenvoegsel'|'email'|'telephone') {
        this.setState({
            settings: {
                ...this.state.settings,
                [setting]: !this.state.settings[setting]
            }
        }, () => {
            this.postSettings();
        })
    }

    postSettings() {
        bodyfull(ApiDictionary.changePrivacySettings, this.state.settings);

    }

    render() {
        return (
            <View style={styles.wrapper}>
                <ScrollView>
                    <Text style={styles.header}>Privacy instellingen</Text>
                    <View style={styles.break}/>
                    <Text>Bewerk hier welke informatie anderen van u kunnen zien.</Text>
                    <View style={styles.break}/>
                    <Hr/>
                    <View style={styles.break}/>
                    {this.state.settings !== undefined ? (
                        <List
                        refreshControl={<RefreshControl refreshing={this.state.isLoading} />}
                        >
                            <CheckBox
                                key={'address'}
                                title='Adres'
                                checked={this.state.settings.address}
                                onPress={() => this.pressedCheckbox('address')
                                }
                            />
                            <CheckBox
                                key={'email'}
                                title='E-mail'
                                checked={this.state.settings.email}
                                onPress={() => this.pressedCheckbox('email')
                                }
                            />
                            <CheckBox
                                key={'telephone'}
                                title='Telefoon'
                                checked={this.state.settings.telephone}
                                onPress={() => this.pressedCheckbox('telephone')
                                }
                            />
                        </List>
                    ) : null}


                    <Hr/>
                    <View style={styles.break}/>
                    <Text style={styles.header}>Profiel instellingen</Text>
                    <View style={styles.break}/>
                    <Text>Bewerk hier persoonlijke informatie</Text>
                    <View style={styles.break}/>
                    <Hr/>
                    
                    <View style={styles.break}/>
                    {this.state.userDetails !== undefined ? (
                        <View>
                            <View style={styles.inputView} >
                                <TextInput
                                    value={this.state.newUserDetails.firstname}
                                    style={styles.inputText}
                                    placeholder="Voornaam.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({newUserDetails: {
                                        ...this.state.newUserDetails, firstname: text
                                    }})}
                                    />
                            </View>
                            <View style={styles.inputView} >
                                <TextInput
                                    style={styles.inputText}
                                    value={this.state.newUserDetails.tussenvoegsel}
                                    placeholder="Tussenvoegsel.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({newUserDetails: {
                                        ...this.state.newUserDetails, tussenvoegsel: text
                                    }})}
                                    />
                            </View>
                            <View style={styles.inputView} >
                                <TextInput
                                    value={this.state.newUserDetails.lastname}
                                    style={styles.inputText}
                                    placeholder="Achternaam.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({newUserDetails: {
                                        ...this.state.newUserDetails, lastname: text
                                    }})}
                                    />
                            </View>
                            <View style={styles.inputView} >
                                <TextInput
                                    value={this.state.newUserDetails.address}
                                    style={styles.inputText}
                                    placeholder="Adres.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({newUserDetails: {
                                        ...this.state.newUserDetails, address: text
                                    }})}
                                    />
                            </View>
                            <View style={styles.inputView} >
                                <TextInput
                                    
                                    value={
                                        !this.state.newUserDetails.telephone || this.state.newUserDetails.telephone.toString() == 'NaN' ? 
                                        '' : this.state.newUserDetails.telephone.toString()
                                    }
                                    style={styles.inputText}
                                    placeholder="Telefoonnummer, zonder 0: 612345678.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({newUserDetails: {
                                         ...this.state.newUserDetails, telephone: parseInt(text)
                                    }})}
                                    />
                            </View>
                            <View style={styles.bigInputView} >
                                <TextInput
                                    value={this.state.newUserDetails.description}
                                    style={styles.bigInputText}
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Description.."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => this.setState({newUserDetails: {
                                        ...this.state.newUserDetails, description: text
                                    }})}
                                    />
                            </View>
                        </View>
                    ): null }
                        <TouchableOpacity
                                    style={styles.confirmButton}
                                    onPress={this.postDetailsPressed.bind(this)}>
                                    <Text style={styles.confirmText}>Update gegevens</Text>
                        </TouchableOpacity>
                </ScrollView>
            </View>
        );
    };

}

const styles = StyleSheet.create({
    break: {
        height: 10,
    },
    header: {
        fontSize: 20,
    },
    wrapper: {
        margin: 15,
    },
    inputView:{
        width:"100%",
        backgroundColor: "#FFFFFF",
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
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    bigInputView:{
        width:"100%",
        backgroundColor: "#FFFFFF",
        borderRadius:3,
        height:150,
        marginBottom: 25,
        justifyContent:"center",
        padding: 24
    },
    bigInputText:{
        height:150,
        color:"black"
    },
    bigTextInput: {
        height: 120,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    confirmButton:{
        width:"50%",
        backgroundColor: colors.primaryLight,
        borderRadius:8,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:60
    },
    confirmText:{
        color:"white"
    },
});
