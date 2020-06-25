import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import colors from "../../constants/colors";
import {IconInput} from "../../components/IconInput";
import bodyless from "../../components/HttpClient";
import {HttpHelper} from "../../components/HttpHelper";
import ApiDictionary from "../../constants/ApiDictionary";
import {AccountRow} from "../../components/startup/AccountRow";
import {Ionicons} from "@expo/vector-icons";
import {StartupWithFollow} from "../../models/StartupWithFollow";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { User } from "../../models/User";
import { ManageUsersButton } from "../../components/ManageUsersButton";
import { UserRole } from "../../models/UserRole";
import { Startup } from "../../models/Startup";

export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    startups: StartupWithFollow[],
    selectedStartup: number,
    searchQuery: string,
}

export class ExploreStartupsScreen extends React.Component<Props, State> {

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state,
            startups: [],
            isLoading: true,
            searchQuery: '',
        };
    }
    componentDidMount() {
        this.fetchStartups();
    }

    fetchStartups() {
        this.setState({
            isLoading: true
        });
        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.followStartups, [])
        ).then(result => {
            this.setState({
                isLoading: false,
                startups: result.data
            });
        });
    }

    private searchFilter(startup: Startup) {
        return StartupWithFollow.searchFilter(startup, this.state.searchQuery);
    }

    private clickedFollowStar(startup: StartupWithFollow) {
        startup.isFollowingThem = !startup.isFollowingThem;
        this.forceUpdate();
        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.changeStartupFollow,
            [startup.startupId, startup.isFollowingThem ? 1 : 0])
        );
    }

    render() {
        return (
            <View style={styles.wrapper}>
                {User.getRole() !== UserRole.user ? (
                    <View>
                    <View style={styles.searchBar}>
                        <IconInput
                            onChangeText={text => {
                                this.setState({searchQuery: text})
                            }}
                            iconName={'md-search'}
                            inputPlaceholder={'Zoek startup...'}
                        />
                    </View>
                    <FlatList
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.fetchStartups()}
                        contentContainerStyle={styles.flatList}
                        data={this.state.startups.filter((startup) => {
                            return this.searchFilter(startup)
                        })}
                        keyExtractor={(item, index) => item.startupId.toString()}
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
                    </View>
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


