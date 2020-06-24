import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import colors from "../../constants/colors";
import {IconInput} from "../../components/IconInput";
import bodyless from "../../components/HttpClient";
import {HttpHelper} from "../../components/HttpHelper";
import ApiDictionary from "../../constants/ApiDictionary";
import {AccountRow} from "../../components/account/AccountRow";
import {Ionicons} from "@expo/vector-icons";
import {UserWithFollow} from "../../models/UserWithFollow";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { User } from "../../models/User";
import { ManageUsersButton } from "../../components/ManageUsersButton";
import { UserRole } from "../../models/UserRole";

export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    accounts: UserWithFollow[],
    selectedUser: number,
    searchQuery: string,
}

export class ExploreUsersScreen extends React.Component<Props, State> {

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
        this.setState({
            isLoading: true
        });
        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.followUsers, ['all'])
        ).then(result => {
            this.setState({
                isLoading: false,
                accounts: result.data
            });
        });
    }

    private searchFilter(account: UserWithFollow) {
        return UserWithFollow.searchFilter(account, this.state.searchQuery);
    }

    private clickedFollowStar(account: UserWithFollow) {
        account.isFollowingThem = !account.isFollowingThem;
        this.forceUpdate();
        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.changeFollow,
            [account.userId, account.isFollowingThem ? 1 : 0])
        );
    }

    private checkForAdmin(){
        if(User.getRole() === UserRole.admin){
            return true;
        } else {return false;}
    }
    
    private checkForUser(){
        return User.getRole() !== UserRole.user;
    }
    

    render() {
        return (
            <View style={styles.wrapper}>
                {this.checkForUser() &&
                <View style={styles.searchBar}>
                    <IconInput
                        onChangeText={text => {
                            this.setState({searchQuery: text})
                        }}
                        iconName={'md-search'}
                        inputPlaceholder={'Zoek gebruiker...'}
                    />
                </View> }
                {this.checkForAdmin() ? (
                    <ManageUsersButton onPress={() => this.props.navigation.navigate('ManageUsers', {edit: false}) }/>
                ) : null }

                {this.checkForUser() ? (
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
                            navigation={this.props.navigation}
                            navigable={true}
                            isExpandable={false}
                            account={item}>
                            <Ionicons onPress={() => this.clickedFollowStar(item)}
                                name={'md-star'} size={35}
                                      style={ item.isFollowingThem ?
                                          styles.followStar : styles.notFollowStar
                                      }/>
                        </AccountRow>
                    }
                    ListFooterComponent={
                        <View style={styles.footer}></View>
                    }
                    />
                ) : (
                    <View style={styles.postloader}>
                            {/* <TouchableOpacity onPress={() => {this.increaseOffset(); this.getFeed() }}> */}
                                <Text style={styles.postloaderText}>Word lid om dit te zien</Text>
                            {/* </TouchableOpacity> */}
                        </View>
                )} 
            </View>
        );
    }

    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Ontdekken',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='profile'
                        iconName='md-person'
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
        };
    }

}

const styles = StyleSheet.create ({
    notFollowStar: {
        color: colors.favoriteStarInactive
    },
    followStar: {
        color: colors.favoriteStarActive
    },
    flatList: {
        width: '100%',
        marginTop: 10,
        paddingHorizontal: '7%',
    },
    wrapper: {
        paddingTop: 20,
        flex: 1,
        width: '100%',
        backgroundColor: colors.backgroundPrimary
    },
    searchBar: {
        paddingHorizontal: '7%',
        marginBottom: 8
    },
    footer: {
        minHeight: 40,
        width: '100%'
    },
    postloader: {
        width: '100%',
        marginVertical: 10,
        alignItems: 'center'
    },
    postloaderText: {
        color: colors.textDark,
        textDecorationLine: 'underline'
    },
});


