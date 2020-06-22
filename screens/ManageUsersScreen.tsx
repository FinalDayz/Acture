import React from 'react';
import {Alert, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {User} from "../models/User";
import RNPickerSelect from 'react-native-picker-select';
import {UserRole} from "../models/UserRole";
import bodyless, { bodyfull } from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import {HttpHelper} from "../components/HttpHelper";
import {IconInput} from "../components/IconInput";
import {AccountRow} from '../components/account/AccountRow';
import {Hr} from '../components/Hr';
import {Ionicons} from '@expo/vector-icons';

export interface Props {

}

interface State {
    isLoading: boolean,
    accounts: User[],
    searchQuery: string,
}

export class ManageUsersScreen extends React.Component<Props, State> {
    state: State;
    private accountIdShown: number = -1;


    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state,
            accounts: [],
            isLoading: true,
            searchQuery: '',
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        console.log('role:' , User.getLoggedInUser().role);
        this.setState({
            isLoading: true
        });
        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.getInOrActiveUsers, ['true'])
        ).then(result => {
            this.setState({
                isLoading: false,
                accounts: result.data
            });
        });
    }

    private askDeleteUser(account: User) {
        const fullName = account.firstname +
            (account.tussenvoegsel ? " " + account.tussenvoegsel : "")
            + " " + account.lastname;
        Alert.alert(
            'Account verwijderen',
            'Weet u zeker dat u het account van ' + fullName + " wilt verwijderen?" +
            "Alle posts van deze gebruiker blijven bestaan.",
            [
                {
                    text: 'Verwijderen',
                    onPress: () => this.deleteUser(account),
                    style: 'destructive'
                },
                {
                    text: 'Annuleren',
                    style: 'cancel'
                },
            ],
            {cancelable: false}
        );
    }

    private deleteUser(account: User) {
        bodyless(HttpHelper.addUrlParameter(ApiDictionary.deleteUser, [account.userId]))
            .then((result) => {
                let accounts = this.state.accounts;
                accounts.splice(this.state.accounts.indexOf(account), 1);
                this.setState({
                    accounts: accounts
                });
            });
    }

    private confirmPasswordReset(account: User){
        const fullName = account.firstname +
            (account.tussenvoegsel ? " " + account.tussenvoegsel : "")
            + " " + account.lastname;
        Alert.alert(
            'Wachtwoord resetten',
            'Weet u zeker dat u het het wachtwoord van ' + fullName + " wilt resetten?",
            [
                {
                    text: 'Resetten',
                    onPress: () => this.resetPassword(account),
                    style: 'destructive'
                },
                {
                    text: 'Annuleren',
                    style: 'cancel'
                },
            ],
            {cancelable: false}
        );
    }

    private resetPassword(account:User){
        const newPassword= this.makeid(10);

        bodyfull(ApiDictionary.resetPassword, {'email': account.email,'newpassword': newPassword}).then((data) => {
            if(data.success) {
                Alert.alert(
                    "Wachtwoord gereset",
                    'Het wachtwoord is veranderd naar: ' + newPassword,
                    [
                        {text: 'OK', onPress: () => console.log(''), style: 'cancel'},
                    ],
                    { cancelable: false })
            }
        }).catch(err => {
            console.log("fetch error" + err.message);
            Alert.alert(
                "Wachtwoord niet gereset",
                'Het wachtwoord is niet veranderd vanwege een fout, probeer het later nog eens',
                [
                    {text: 'OK', onPress: () => console.log(''), style: 'cancel'},
                ],
                { cancelable: false })
        })

       
    }

    private makeid(length: number) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    private changeRole(account: User, newRole: UserRole) {
        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.changeUserRole, [account.userId, newRole])
        );
    }

    private searchFilter(account: User): boolean {
        return User.searchFilter(account, this.state.searchQuery);
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={{paddingHorizontal: '7%', paddingTop: 20}}>
                    <IconInput
                        onChangeText={text => {
                            this.setState({searchQuery: text})
                        }}
                        iconName={'md-search'}
                        inputPlaceholder={'Zoek gebruiker...'}
                    />
                </View>
                <FlatList
                    refreshing={this.state.isLoading}
                    onRefresh={() => this.fetchUsers()}
                    contentContainerStyle={styles.flatList}
                    data={this.state.accounts.filter((user) => {
                        return this.searchFilter(user)
                    })}
                    keyExtractor={(item, index) => item.userId.toString()}
                    renderItem={({item}) =>
                        <AccountRow
                            isExpandable={true}
                            account={item}>
                            <Hr/>
                            <View style={[styles.flexRow, styles.controlElement]}>
                                <Text style={{flex: 2, fontSize: 18}}>Gebruikers Rol</Text>
                                <View style={{flex: 1,}}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: item.role.toString(),
                                            value: item.role.toString(),
                                        }}
                                        style={rolePickerStyle}
                                        onValueChange={(value) => this.changeRole(item, value)}
                                        items={
                                            Object.keys(UserRole)
                                                .filter(role => role !== item.role)
                                                .map(role => ({label: role, value: role}))
                                        }
                                        Icon={() => {
                                            return (
                                                <Ionicons name="ios-arrow-dropdown" size={20}
                                                          style={{}}/>
                                            )
                                        }}
                                    >

                                    </RNPickerSelect>
                                </View>
                            </View>
                            <Hr/>
                            <View style={[styles.flexRow, styles.controlElement]}>
                                <Text style={{flex: 2, fontSize: 18}}>Verwijder gebruiker</Text>
                                <View style={{flex: 1}}>

                                    <Button
                                        title={'Verwijder'}
                                        color={'red'}
                                        onPress={() => this.askDeleteUser(item)}
                                    />
                                </View>
                            </View>
                            <View style={[styles.flexRow, styles.controlElement]}>
                                <Text style={{flex: 2, fontSize: 18}}>Reset wachtwoord</Text>
                                <View style={{flex: 1}}>

                                    <Button
                                        title={'Reset'}
                                        color={'red'}
                                        onPress={() => this.confirmPasswordReset(item)}
                                    />
                                </View>
                            </View>

                        </AccountRow>

                    }
                />
            </View>
        );
    }
}

const rolePickerStyle = StyleSheet.create({
    iconContainer: {
        paddingRight: 5,
    },
    placeholder: {
        color: '#696969',
        fontSize: 18,
    },
    inputIOS: {
        color: '#696969',
        fontSize: 18,
    },
    inputAndroid: {
        color: '#696969',
        fontSize: 18,
    },
    viewContainer: {
        padding: 2,
        paddingLeft: 5,
        borderRadius: 5,
        backgroundColor: 'white',

    },
});

const styles = StyleSheet.create({
    controlElement: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 35,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    flatList: {
        width: '100%',
        paddingHorizontal: '7%',
        marginTop: 10,
        paddingBottom: 50,
    },
    wrapper: {
        flex: 1,
        width: '100%',
    }
});
