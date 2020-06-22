import React from 'react';
import {View, StyleSheet, Text, Button, Image, Dimensions} from 'react-native';
import colors from '../constants/colors';
import bodyless, { bodyfull } from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";
import {PostModel} from "../models/PostModel";
import {List} from "native-base";
import {Post} from "../components/Post";
import { ScrollView } from 'react-native-gesture-handler';
import  { HttpHelper } from '../components/HttpHelper';
import { User } from '../models/User';
import { UserRole } from '../models/UserRole';
import {ListItem} from "react-native-elements";

export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    blogs: [],
    currentUser: User
};

export default class ProfileScreen extends React.Component<Props, State> {

    private windowWidth = Dimensions.get('window').width;
    _isMounted: boolean;

    constructor(props: Props, state: State){
        super(props);

        this.state = {
            ...props,
            ...state,
            currentUser: new User(undefined),
            isLoading: false
        }

        this._isMounted = false;

        const navigation = this.props.navigation;
        this.state.currentUser.userId = this.props.navigation.state.params.id
    }

    componentDidMount() {
        console.log("user id within object: " + this.state.currentUser.userId)
        this.getCurrentUser()
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getCurrentUser() {
        console.log("sup1")
        if(this.state.isLoading == false) {
            this.setState({isLoading:true})
            console.log("sup2")
            bodyless(HttpHelper.addUrlParameter(ApiDictionary.getUserById, [this.state.currentUser.userId])).then((data) => {
                console.log("sup3")
                if(data.success === 1) {
                    console.log("sup4")
                    this.state.currentUser.setUser(data.data)
                    this.setState({isLoading: false})
                    this.getBlogs()
                } else {
                    console.log("bigoof", data)
                    this.setState({isLoading: false})
                }
            })
        }
    }

    // getStartupData() {
    //     bodyless(HttpHelper.addUrlParameter(ApiDictionary.getStartupById, [this.state.id]))
    // }

    render() {

        return(
            <View>
                {/* <View style={{flex: 1, flexDirection: 'row', alignContent: 'stretch', alignItems: 'stretch'}}>
                    <Image
                    style={{
                    height: 150,
                    width: 150,
                    borderWidth: 1,
                    borderRadius: 75}}
                    source={{uri: 'https://i.imgur.com/Ngq9RoP.jpg'}}
                    resizeMode="cover"
                    />
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                    <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                    <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
                </View> */}
                {/* <View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                    }}>
                        <View style={{marginLeft: 10, marginTop: 30}}><Image
                        style={{
                        height: this.windowWidth/2.5,
                        width: this.windowWidth/2.5,
                        borderWidth: 1,
                        borderRadius: this.windowWidth/5}}
                        source={{uri: 'https://i.imgur.com/Ngq9RoP.jpg'}}
                        resizeMode="cover"
                        /></View>
                        <View>
                        <Text>{this.state.isLoading}</Text>
                        </View>
                        <View style={{height: this.windowWidth/2, width: this.windowWidth/2, backgroundColor: 'skyblue', margin: 10}}>
                        </View>
                    </View>
                </View> */}
                <View style={this.styles.separator} />


                 {/* TODO: Tab-specific content on top*/}

                    {/*separator:*/}
                <Text>{this.state.currentUser.firstname}</Text>
                <View style={this.styles.separator} />
                <Text>{"id: " + this.state.currentUser.userId}</Text>
                <View style={this.styles.separator} />
                <Text>{ JSON.stringify(HttpHelper.addUrlParameter(ApiDictionary.getUserById, [this.state.currentUser.userId])) }</Text>
                <View style={this.styles.separator} />

                <View>
                    <ListItem
                        style={this.styles.privacyButton}
                        title={'Privacy instellingen'}
                        leftIcon={{ name: 'lock' }}
                        chevron
                        onPress = {() => this.props.navigation.navigate('userPrivacyScreen')}
                    />
                    <List
                        dataArray={this.state.blogs}
                        renderRow={(item) => {
                            return <Post data={item}/>
                        }}
                    />
                </View>
            </View>
        );
    }

    //options for header bar. Default options are in the navigator.
    navigationOptions = {
        headerTitle: 'Profiel'
    };


    getBlogs() {
        if(!this.state.isLoading) {
            this.setState({isLoading:true})
            bodyfull(ApiDictionary.getUserBlogs, {
                userId: this.state.currentUser.userId
            })
               .then((result) => {
                if(result.success === 1) {
                    this.setState({blogs: result.data, isLoading: false})
                } else {
                    this.setState({isLoading: false})
                }})
            .catch ((error) => {
                console.log(error);
            })
            this.setState({isLoading : false});
        }
    }

    handleDelete(postId: string) {
        const newData = this.state.blogs.filter(
            (post) => post.postId.toString() != postId
        );

        this.setState({
            blogs: newData
        })
    };

    styles = StyleSheet.create ({
        privacyButton: {
            marginHorizontal: 15,
        },
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            backgroundColor: colors.backgroundPrimary
        },
        separator: {
            borderBottomColor: '#747474',
            borderBottomWidth: 1,
            marginHorizontal: 15,
            marginVertical: 15
        }
    });
}
