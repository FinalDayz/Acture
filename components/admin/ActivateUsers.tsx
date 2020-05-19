import React from 'react';
import {FlatList, Text, StyleSheet, View, Button, CheckBox, TouchableOpacity} from 'react-native';
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

        let dummyUser = new User();
        dummyUser.userId = 1;
        dummyUser.activivated = false;
        dummyUser.email = 'henk@gmail.com';
        dummyUser.role = 'USER';
        dummyUser.firstname = 'Henk';
        dummyUser.lastname = 'Appelboom';

        let dummyUser2 = {...dummyUser};
        dummyUser2.userId = 2;
        dummyUser2.email = 'hans@gmail.com';
        dummyUser2.firstname = 'Hans';
        dummyUser2.lastname = 'van boom';

        let dummyUser3 = {...dummyUser};
        dummyUser3.userId = 3;
        dummyUser3.email = 'Herman@gmail.com';
        dummyUser3.firstname = 'Herman';
        dummyUser3.lastname = 'van eikeren';

        let dummyUser4 = {...dummyUser};
        dummyUser4.userId = 4;
        dummyUser4.email = 'Michiel@gmail.com';
        dummyUser4.firstname = 'Michiel';
        dummyUser4.lastname = 'Boere';

        this.state = {
            ...state,
            accounts: [
                dummyUser,
                dummyUser2,
                dummyUser3,
                dummyUser4
            ]
        };
    }

    activateAccount (account: User)
    {
        let accounts = this.state.accounts;
        accounts.splice(this.state.accounts.indexOf(account), 1);

        this.setState({
            accounts: accounts
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
        borderRadius:8,
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
