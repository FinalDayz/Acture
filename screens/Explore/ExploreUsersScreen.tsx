import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import colors from "../../constants/colors";
import {IconInput} from "../../components/IconInput";
import bodyless from "../../components/HttpClient";
import {HttpHelper} from "../../components/HttpHelper";
import ApiDictionary from "../../constants/ApiDictionary";
import {AccountRow} from "../../components/account/AccountRow";
import {Hr} from "../../components/Hr";
import {Ionicons} from "@expo/vector-icons";
import {UserWithFollow} from "../../models/UserWithFollow";

export interface Props {

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

    navigationOptions() {

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

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={{paddingHorizontal: '7%'}}>
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
                            isExpandable={false}
                            account={item}>
                            <Ionicons onPress={() => this.clickedFollowStar(item)}
                                name={'md-star'} size={35}
                                      style={ item.isFollowingThem ?
                                          styles.followStar : styles.notFollowStar
                                      }/>
                        </AccountRow>
                    }/>
            </View>
        );
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
        flex: 1,
        paddingHorizontal: '7%',
    },
    wrapper: {
        paddingTop: 20,
        flex: 1,
        width: '100%',
    }
});


