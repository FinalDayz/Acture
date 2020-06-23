import React from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from "../constants/colors";
import {User} from "../models/User";
import bodyless from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import {HttpHelper} from "../components/HttpHelper";
import {AccountRow} from '../components/account/AccountRow';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    accounts: User[],
}


export class ActivateUsersScreen extends React.Component<Props, State> {
    state: State;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state,
            accounts: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        this.fetchInactive();
    }

    fetchInactive() {
        this.setState({
            isLoading: true,
        });
        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.getInOrActiveUsers, ['false'])
        ).then(result => {
            this.setState({
                isLoading: false,
                accounts: result.data
            });
        });
    }

    sendActivate(id: number, callback: () => void) {
        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.activateUser, [id]
        ));
        callback();
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
        this.sendActivate(account.userId, () => {
            let accounts = this.state.accounts;
            accounts.splice(this.state.accounts.indexOf(account), 1);
            this.setState({
                accounts: accounts
            });
        });
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <FlatList
                    refreshing={this.state.isLoading}
                    onRefresh={() => this.fetchInactive()}
                    contentContainerStyle={styles.flatList}
                    data={this.state.accounts}
                    keyExtractor={(item, index) => item.userId.toString()}
                    renderItem={({item}) =>
                        <AccountRow
                            isExpandable={false}
                            account={item}>
                            <TouchableOpacity
                                onPress={() => this.confirmActivation(item)}
                                style={styles.activateBtn}>
                                <Text style={styles.activateBtnText}>Activeer</Text>
                            </TouchableOpacity>
                        </AccountRow>
                    }
                />
            </View>
        );
    }

    //options for header bar. Default options are in the navigator.
    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Gebruikers beheren',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                    title='profile'
                    iconName='md-person' //TODO: change to profile picture
                    onPress={() => {
                        navData.navigation.navigate('Profile', {id: User.getLoggedInUser().userId})
                    }}/>
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title='menu'
                        iconName='md-menu'
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }} 
                    />
                </HeaderButtons>
            )
        }
    };
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
    flatList: {
        width: '100%',
        paddingHorizontal: '7%',
        marginTop: 10,
        paddingBottom: 50,
    },
    wrapper: {
        flex: 1,
        width: '100%',
    },
});
