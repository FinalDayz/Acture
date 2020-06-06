import React from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from "../constants/colors";
import {User} from "../models/User";
import RNPickerSelect from 'react-native-picker-select';
import {UserRole} from "../models/UserRole";
import bodyless from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import {HttpHelper} from "../components/HttpHelper";
import {IconInput} from "../components/IconInput";
import {AccountRow} from '../components/account/AccountRow';

export interface Props {

}

interface State {
    isLoading: boolean,
    accounts: User[],
    selectedUser: number,
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
            selectedUser: -1,
            isLoading: true,
            searchQuery: '',
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
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

            });
    }

    private changeRole(account: User, newRole: UserRole) {
        console.log("Change user " + account.email+" to: " + newRole);
        console.log(HttpHelper.addUrlParameter(ApiDictionary.changeUserRole, [account.userId, newRole]));
        bodyless(HttpHelper.addUrlParameter(ApiDictionary.changeUserRole, [account.userId, newRole]))
            .then((result) => {

            });
    }

    private pressedAccount(account: User) {
        let id = account.userId;
        if (this.state.selectedUser === id)
            id = -1;
        this.setState({
            selectedUser: id
        });
    }

    private searchFilter(account: User): boolean {
        const searchQuery = this.state.searchQuery;
        if(!searchQuery)
            return true;
        return (
           (account.firstname +
               (account.tussenvoegsel ? " " + account.tussenvoegsel : "")
                + " " + account.lastname).includes(searchQuery) ||
            account.email.includes(searchQuery)
        );
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={{paddingHorizontal: '7%', paddingTop: 20}}>
                    <IconInput
                        onChangeText={text => {this.setState({searchQuery: text})}}
                        iconName={'md-search'}
                        inputPlaceholder={'Zoek gebruiker...'}
                    />
                </View>
                <FlatList
                    refreshing={this.state.isLoading}
                    onRefresh={() => this.fetchUsers()}
                    contentContainerStyle={styles.flatList}
                    data={this.state.accounts.filter((user) => {return this.searchFilter(user)})}
                    keyExtractor={(item, index) => item.userId.toString()}
                    renderItem={({item}) =>
                        <AccountRow
                            isExpandable={true}
                            account={item}>
                            <View style={[styles.flexRow, styles.controlElement]}>
                                <Text style={{flex: 2, fontSize: 18}}>Gebruikers Rol</Text>
                                <View style={{flex: 1}}>
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
                                    />
                                </View>
                            </View>
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

                        </AccountRow>

                    }
                />
            </View>
        );
    }
}

const rolePickerStyle = StyleSheet.create({
    placeholder: {
        color: 'blue',
        fontSize: 18,
    },
    inputIOS: {
        color: 'blue',
        fontSize: 18,
    },
    inputAndroid: {
        color: 'blue',
        fontSize: 18,
    },
    viewContainer: {
        alignItems: 'center',
    },
});

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    controlElement: {
        height: 40,
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
        flex: 1,
    },
    wrapper: {
        flex: 1,
        width: '100%',
    }
});
