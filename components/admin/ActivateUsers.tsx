import React from 'react';
import {FlatList, Text, StyleSheet, View, Button, CheckBox, TouchableOpacity, Alert} from 'react-native';
import {User} from '../../models/User';
import {UserToActivate} from "./UserToActivate";
import colors from "../../constants/colors";

export interface Props {
}

interface State {
    accounts: User[]
}


export class ActivateUsers extends React.Component<Props, State> {
    state: State;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state,
            accounts: []
        };

        this.fetchInactive();
    }

    fetchInactive() {
        fetch("http://192.168.2.146:3000/api/users/inactiveUsers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        accounts: result.data
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    sendActivate(id: number, callback: (error: any) => void) {
        console.log("http://192.168.2.146:3000/api/users/activateUser/" + id);
        fetch("http://192.168.2.146:3000/api/users/activateUser/" + id,
            {
                'method': 'PATCH'
            }).then(result => {
                callback(null);
            },
            error => {
                callback(error);
            });

    }

    activateAccount(account: User) {

        this.sendActivate(account.userId, (error) => {
            if (error === null) {
                console.log("DONE WITH REQUEST, error is null");
                let accounts = this.state.accounts;
                accounts.splice(this.state.accounts.indexOf(account), 1);

                this.setState({
                    accounts: accounts
                });
            } else {
                Alert.alert("Error activating user!" + error);
            }
        })
    }

    render() {
        return (

            <View style={styles.wrapper}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    data={this.state.accounts}
                    keyExtractor={(item, index) => item.userId.toString()}
                    renderItem={({item}) =>

                        <View style={styles.accountWrapper}>
                            <View style={styles.profilePicture}/>
                            <Text
                                style={styles.accountText}>
                                {item.firstname} {item.lastname}
                            </Text>

                            <TouchableOpacity
                                onPress={() => this.activateAccount(item)}
                                style={styles.activateBtn}>
                                <Text style={styles.activateBtnText}>Activeer</Text>
                            </TouchableOpacity>

                        </View>

                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    activateBtnText: {
        color: colors.textLight,
    },
    activateBtn: {
        borderRadius: 8,
        padding: 7,
        marginRight: 10,
        backgroundColor: colors.primaryLight,
    },
    profilePicture: {
        backgroundColor: '#999',
        borderRadius: 50,
        height: 50,
        width: 50,
    },
    accountText: {
        width: '50%',
        paddingLeft: 20,
        color: colors.textGrey,
        fontWeight: 'bold',
        fontSize: 15,
        flex: 1,
    },
    accountWrapper: {
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary,
        width: '100%',
        marginTop: 10,
        padding: 10,
        borderRadius: 50,
        flexDirection: 'row',
    },
    flatList: {
        width: '100%',
        paddingHorizontal: '7%',
        marginTop: 50,
        flex: 1,

    },
    wrapper: {
        flex: 1,
        width: '100%',
    }
});
