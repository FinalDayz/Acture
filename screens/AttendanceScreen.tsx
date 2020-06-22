import React from "react";
import {View, Text, StyleSheet, FlatList, Button} from "react-native";
import colors from "../constants/colors";
import {IconInput} from "../components/IconInput";
import bodyless from "../components/HttpClient";
import {HttpHelper} from "../components/HttpHelper";
import ApiDictionary from "../constants/ApiDictionary";
import {AccountRow} from "../components/account/AccountRow";
import {Hr} from "../components/Hr";
import {Ionicons} from "@expo/vector-icons";
import {UserWithFollow} from "../models/UserWithFollow";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { User } from "../models/User";


export interface Props {

}

interface State {
    isLoading: boolean,
    accounts: UserWithFollow[],
    selectedUser: number,
    searchQuery: string,
}

export default class AttendanceScreen extends React.Component<any, State> {

    constructor(props: any, state: State) {
        super(props, state);
        this.state = {
            ...state,
            accounts: [],
            isLoading: false,
            searchQuery: '',
        };
    }

    componentDidMount() {
        this.fetchAttendance();
        console.log("DID MOUNT")
    }

    componentDidUpdate(prevProps: any){
        console.log(prevProps.navigation)
        if (prevProps !== undefined) {
            // console.log(this.props.navigation.isFocused())
            if (prevProps.navigation.state.params.eventId !== this.props.navigation.state.params.eventId) {
                this.fetchAttendance();
            }
        }
    }
    componentWillUnmount() {
        // this.setState({accounts: []})
        console.log("WILL UNMOUNT")
        // this.fetchAttendance()
    }

    fetchAttendance() {
        const eventId = this.props.navigation.state.params.eventId;
        if (!this.state.isLoading) {
            this.setState({isLoading: true})
                bodyless(HttpHelper.addUrlParameter(ApiDictionary.getAttendance, [eventId])
                ).then(result => {
                    this.setState({
                        isLoading: false,
                        accounts: result.data
                    });
                })
        }
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
                    onRefresh={() => this.fetchAttendance()}
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
                                      style={item.isFollowingThem ?
                                          styles.followStar : styles.notFollowStar
                                      }/>
                        </AccountRow>
                    }/>
            </View>
        );
    }

    static navigationOptions = (navData: any) => {
        return {
            headerTitle: 'Attendance',
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
                        iconName='md-arrow-round-back'
                        onPress={() => {
                            navData.navigation.goBack(null);
                        }}
                    />
                </HeaderButtons>
            )
        };
    }

}

const styles = StyleSheet.create({
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
    }
});


