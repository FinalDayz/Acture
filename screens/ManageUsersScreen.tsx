import React from 'react';
import {
    FlatList,
    Text,
    StyleSheet,
    View,
    Button,
    CheckBox,
    TouchableOpacity,
    Alert,
    Picker,
    Image,
    TextStyle
} from 'react-native';
import colors from "../constants/colors";
import {User} from "../models/User";
import RNPickerSelect from 'react-native-picker-select';
import {UserRole} from "../models/UserRole";
import bodyless, { bodyfull } from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';

export interface Props {

}

interface State {
    accounts: User[],
    selectedUser: number,
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
        };


        this.fetchUsers();
    }

    fetchUsers() {
        bodyless(ApiDictionary.getAllUsers).then(result => {
            this.setState({
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
        const url = 'changeRole/:id/:newRole';
    }

    private pressedAccount(account: User) {
        let id = account.userId;
        if (this.state.selectedUser === id)
            id = -1;
        this.setState({
            selectedUser: id
        });
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    data={this.state.accounts}
                    keyExtractor={(item, index) => item.userId.toString()}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() => this.pressedAccount(item)}>
                            <View style={styles.accountWrapper}>
                                <View style={styles.flexRow}>
                                    <View style={styles.profilePicture}>
                                        <Image source={{uri: "data:image/png;base64," + item.image, scale: 1}}
                                               style={styles.profilePicture}/>
                                    </View>
                                    <View
                                        style={[styles.profileInfo, styles.flexColumn]}>
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
                                </View>
                                <View style={[styles.flexColumn,
                                    this.state.selectedUser === item.userId ? styles.userControlsShown : styles.userControlsHidden,
                                    {width: '95%'}
                                ]}>
                                    <View style={[styles.flexRow, styles.controlElement]}>
                                        <Text style={{flex: 2, fontSize: 18}}>Gebruikers Rol</Text>
                                        <View style={{flex: 1}}>
                                            <RNPickerSelect
                                                placeholder={{
                                                    label: item.role.toString(),
                                                    value: item.role.toString(),
                                                }}
                                                style={rolePickerStyle}
                                                onValueChange={(value) => console.log(value)}
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
                                </View>

                            </View>
                        </TouchableOpacity>

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

    controlElement: {
        height: 40,
    },
    userControlsShown: {
        marginTop: 15,
    },
    userControlsHidden: {
        display: 'none',
        height: 0,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    profileInfo: {
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
    profilePicture: {
        backgroundColor: '#999',
        borderRadius: 40,
        height: 40,
        width: 40,
    },
    accountWrapper: {
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary,
        width: '100%',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'column',
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
