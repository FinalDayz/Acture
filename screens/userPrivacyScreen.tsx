import React from "react";
import {StyleSheet, View, Text} from "react-native";
import colors from "../constants/colors";
import {CheckBox} from "react-native-elements";
import {Hr} from "../components/Hr";
import {List} from "native-base";
import bodyless from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";

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
    }
}

export default class userPrivacyScreen extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state,
        };

        this.fetchSettings();
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

    getDefaultSettings(): {
        firstname: boolean,
        lastname: boolean,
        address: boolean,
        tussenvoegsel: boolean,
        email: boolean,
        telephone: boolean,
    } {
        return {
            firstname: false,
            lastname: false,
            address: false,
            tussenvoegsel: false,
            email: false,
            telephone: false,
        };
    }

    pressedCheckbox(setting: 'firstname'| 'lastname'| 'address'|'tussenvoegsel'|'email'|'telephone') {
        this.setState({
            settings: {
                ...this.state.settings,
                [setting]: !this.state.settings[setting]
            }
        }, () => {
            this.postSettings
        })
    }

    postSettings() {

    }

    render() {
        return (
            <View style={styles.wrapper}>
                <Text style={styles.header}>Privacy instellingen</Text>
                <View style={styles.break}/>
                <Text>Bewerk hier welke informatie andere van u kunnen zien.</Text>
                <View style={styles.break}/>
                <Hr/>
                <View style={styles.break}/>
                {this.state.settings !== undefined ? (
                    <List>
                        <CheckBox
                            key={'voornaam'}
                            title='Voornaam'
                            checked={this.state.settings.firstname}
                            onPress={() => this.pressedCheckbox('firstname')
                            }
                        />
                        <CheckBox
                            key={'achternaam'}
                            title='achternaam'
                            checked={this.state.settings.lastname}
                            onPress={() => this.pressedCheckbox('lastname')
                            }
                        />
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
    }
});
