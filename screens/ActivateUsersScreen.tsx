import React from 'react';
import {FlatList, Text, StyleSheet, View, Button, CheckBox, TouchableOpacity, Alert, Picker, Image} from 'react-native';
import colors from "../constants/colors";
import {User} from "../models/User";
import RNPickerSelect from 'react-native-picker-select';

export interface Props {

}

interface State {
    accounts: User[]
}


export class ActivateUsersScreen extends React.Component<Props, State> {
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
                (result: { data: Array<User> }) => {

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

    confirmActivation(account: User) {
        /*TODO: make this use getFullName() once working with User objects*/
        const fullName = account.firstname +
            (account.tussenvoegsel ? " " + account.tussenvoegsel : "")
            + " " + account.lastname;
        Alert.alert(
            'Account activeren',
            'Weet u zeker dat u het account van ' + fullName + " wilt activeren?",
            [
                {
                    text: 'Activeren',
                    onPress: () => this.activateAccount(account)
                },
                {
                    text: 'Annuleren',
                    style: 'cancel'
                },
            ],
            {cancelable: false}
        );
    }

    activateAccount(account: User) {

        this.sendActivate(account.userId, (error) => {
            if (error === null) {

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
                            <View style={styles.profilePicture}>
                                <Image source={{uri: "data:image/png;base64," + item.image, scale: 1}}
                                       style={styles.profilePicture}/>
                            </View>
                            <View
                                style={styles.profileInfo}>
                                <Text
                                    style={styles.accountName}>
                                    {/*TODO: make this use getFullName() once working with User objects*/}
                                    {item.firstname +
                                    (item.tussenvoegsel ? " " + item.tussenvoegsel : "")
                                    + " " + item.lastname}
                                </Text>
                                <Text
                                    style={styles.accountEmail}>
                                    {item.email}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => this.confirmActivation(item)}
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
    profileInfo: {
        flexDirection: 'column',
        width: '50%',
        flex: 1,
        paddingRight: 10,
    },
    accountEmail: {
        color: colors.textGrey,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 12,
        flexWrap: "wrap",
    },
    accountName: {
        paddingLeft: 10,
        color: colors.textDark,
        fontWeight: 'bold',
        fontSize: 15,
    },
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
