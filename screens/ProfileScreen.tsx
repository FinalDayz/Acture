import React, { useCallback } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, FlatList, Linking, Alert, Button, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import bodyless, { bodyfull } from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";
import { PostModel } from "../models/PostModel";
import {Container } from "native-base";
import { Post } from "../components/Post";
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {HttpHelper} from '../components/HttpHelper';
import {User} from '../models/User';
import {Ionicons} from '@expo/vector-icons';
import {AccountRow} from '../components/startup/AccountRow';
import {StartupWithFollow} from '../models/StartupWithFollow';
import {ContactInfo} from '../models/ContactInfo';
import {ActivityIndicator} from 'react-native-paper';
import { ListItem } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import {error} from "util";
import { UserRole } from '../models/UserRole';

export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    blogs: PostModel[],
    currentUser: User,
    selectedTab: string,
    startups: StartupWithFollow[],
    contactItems: ContactInfo[],
    isOwnProfile: boolean,
};

const OpenURLButton = (url: string, children: string) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <Button title={children} onPress={handlePress}/>;
};

// let newBlogs: PostModel[];

export default class ProfileScreen extends React.Component<Props, State> {

    private windowWidth = Dimensions.get('window').width;
    _isMounted: boolean;

    constructor(props: Props, state: State) {
        super(props);

        this.state = {
            ...props,
            ...state,
            currentUser: new User(undefined),
            isLoading: false,
            selectedTab: 'Over',
            startups: [],
            isOwnProfile: false,
        }

        this._isMounted = false;

        const navigation = this.props.navigation;
        this.state.currentUser.userId = this.props.navigation.state.params.id
    }

    componentDidMount() {
        this.getCurrentUser()
        this.fetchUserLinkedStartups()
        this.getBlogs()

        this.setState({
            isOwnProfile: this.state.currentUser.userId === User.getLoggedInUser().userId
        });

        this._isMounted = true;
    }


    handleDelete(postId: string) {
        const newData = this.state.blogs.filter(
            (post) => post.postId.toString() != postId
        );

        this.setState({
            blogs: newData
        })
    };

    showAttendance= (eventId: any) => {
        this.props.navigation.navigate('Attendance', {eventId: eventId})
    }

//     componentDidUpdate(prevProp: any){
//        console.log("this is prevProp" + prevProp)
//     if(prevProp.refresh != false){
//         this.setState({blogs: this.getBlogs()})
//     }
// }
    refresh(data: any){
    let newBlogs =  this.getBlogs()
        this.setState({blogs: newBlogs})
     this.state.currentUser.setUser(data);
    
    }
    handleEdit(data: any) {
        this.props.navigation.navigate('PostAddScreen', {edit: true, data: data, onRefresh: () => this.refresh(data)});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    //options for header bar. Default options are in the navigator.
    navigationOptions = {
        headerTitle: 'Profiel'
    };

    toStartupList() {
        this.props.navigation.navigate('StartupList', {startups: this.state.startups});
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={this.styles.screen}>
                    <ActivityIndicator size="large" color={colors.textLight}/>
                </View>
            )
        } else {
            return(
                <View style={this.styles.screen}>
                    <View style={this.styles.lowerScrollable}>
                        {this.state.isOwnProfile &&
                        <View style={{flexDirection: 'row', paddingHorizontal: 15, borderBottomWidth: 1, borderColor: colors.backgroundSecondary}}>
                            <TouchableOpacity style={this.styles.privacyButton}
                                              onPress = {() => this.props.navigation.navigate('userPrivacyScreen',{onRefresh: (data:any) => this.refresh(data)})}>
                                <Ionicons name={'md-settings'} size={30}
                                          color={"grey"} style={this.styles.privacyIcon}/>
                                <Text style={this.styles.privacyText}>Instellingen</Text>
                            </TouchableOpacity>

                            {User.getRole() !== UserRole.user &&
                                <View style={this.styles.privacyDivider}></View> &&
                                <TouchableOpacity style={this.styles.privacyButton}
                                                onPress = {() => this.props.navigation.navigate('NewStartupScreen')}>
                                    <Text style={this.styles.privacyText}>Nieuwe startup</Text>
                                    <Ionicons name={'md-add'} size={30}
                                            color={"grey"} style={this.styles.privacyIcon}/>
                                </TouchableOpacity>
                            }

                        </View>
                        }
                        <FlatList
                            ListHeaderComponent={(
                                this.headerBinder()
                            )}
                            refreshing={this.state.isLoading}
                            contentContainerStyle={this.styles.list}
                            data={this.state.blogs}
                            keyExtractor={(item, index) => item.postId.toString()}
                            renderItem={itemData =>
                                <Post
                                    data={itemData.item}
                                    onEdit={this.handleEdit.bind(this)}
                                    onDelete={this.handleDelete.bind(this)}
                                    handlePress={() => {
                                    }}
                                    navigation={this.props.navigation}/>
                            }
                        />
                    </View>
                </View>
            );
        }
    }

    headerBinder() {
        return (
            <View>
                <Container style={this.styles.topScrollable}>
                    <View style={this.styles.imagestyling}>
                        <TouchableWithoutFeedback
                            onPress={() => this.tappedProfileImage()}>
                            <Image
                                style={this.styles.image}
                                source={{uri: "data:image/png;base64," + this.state.currentUser.image}}

                                resizeMode="cover"
                            />
                        </TouchableWithoutFeedback>
                        <Container style={this.styles.nameBox}>
                            <Text style={[this.styles.text, {textAlign: "center", fontSize: 25}]} adjustsFontSizeToFit
                                  numberOfLines={3}>{this.state.currentUser.getFullName()}</Text>
                        </Container>
                    </View>
                </Container>
                {this.tabGenerator(['Over', 'Startups', 'Contact'])}
                {this.tabRouter()}
            </View>
        )
    }

    tabRouter() {
        switch (this.state.selectedTab) {

            case 'Over':
                return (
                    <View style={{marginHorizontal: "7%"}}>
                        <Text style={this.styles.descriptionText}>{this.state.currentUser.description}</Text>
                        <View style={this.styles.separator}/>
                    </View>
                );

            case 'Startups':
                return (
                    <View style={{marginHorizontal: "7%", marginTop: 10}}>
                        {this.state.currentUser.userId !== User.getUserId() &&
                        <Text style={[this.styles.descriptionText, {textAlign: 'center'}]}>
                            {this.state.currentUser.firstname + " is aangesloten bij deze startups:"}</Text>
                        }
                        {this.state.currentUser.userId === User.getUserId() && this.state.startups.length > 0 &&
                        <Button title={'Startups beheren'} onPress={this.toStartupList.bind(this)}/>
                        }
                        {this.state.startups.length === 0 &&
                        <Text style={[this.styles.descriptionText, {textAlign: 'center'}]}>
                            Er zijn geen startups om weer te geven</Text>
                        }
                        <FlatList
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.fetchUserLinkedStartups()}
                            contentContainerStyle={this.styles.flatList}
                            data={this.state.startups}
                            keyExtractor={(item, index) => item.startupId.toString()}
                            renderItem={({item}) =>
                                <AccountRow
                                    navigation={this.props.navigation}
                                    navigable={true}
                                    isExpandable={false}
                                    account={item}>
                                    <Ionicons onPress={() => this.clickedFollowStar(item)}
                                              name={'md-star'} size={35}
                                              style={this.isFollowing(item)}/>
                                </AccountRow>
                            }/>
                        <View style={this.styles.separator}/>
                    </View>
                );

            case 'Contact':
                return (
                    <View style={{marginHorizontal: "7%"}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 2}}>
                                <Text style={[this.styles.contactText]}>E-mail adres:</Text>
                                {this.state.currentUser.telephone ? (
                                    <Text style={[this.styles.contactText]}>Telefoon:</Text>
                                ) : null}
                                {this.state.currentUser.address ? (
                                    <Text style={[this.styles.contactText]}>Adres:</Text>
                                ) : null}

                            </View>
                            <View style={{flex: 3}}>
                                <Text style={[this.styles.contactValue, this.styles.textClickable]}
                                      onPress={() => Linking.openURL('mailto:' + this.state.currentUser.email)}>
                                    {this.state.currentUser.email}
                                </Text>
                                {this.state.currentUser.telephone ? (
                                    <Text style={[this.styles.contactValue, this.styles.textClickable]}
                                          onPress={() => Linking.openURL('https://wa.me/31' + this.state.currentUser.telephone)}>
                                        {"" + this.state.currentUser.telephone}
                                    </Text>
                                ) : null}
                                {this.state.currentUser.address ? (
                                    <Text style={[this.styles.contactValue]}>{this.state.currentUser.address}</Text>
                                ) : null}
                            </View>
                        </View>
                        <View style={this.styles.separator}/>
                    </View>
                );
        }
    }

    tappedProfileImage() {
        if (!this.state.isOwnProfile) {
            return;
        }
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            aspect: [1, 1],
            quality: 0.02,

        }).then(result => {
            if (!result.cancelled) {
                const base64Image = result.base64;
                if (base64Image !== undefined) {
                    this.changeProfilePic(base64Image);
                }
            }
        });
    }

    changeProfilePic(base64Image: string) {
        bodyfull(ApiDictionary.uploadProfileImage,
            {
                imageBase64: base64Image
            }).then(x => {

            this.state.currentUser.image = base64Image;
            this.setState({
                currentUser: this.state.currentUser
            });
        });
    }

    contentAction(action: string, user: User) {
        switch (action) {
            case 'email':
                break;
            case 'whatsapp':
                break;
        }
    }

    isFollowing(item: StartupWithFollow) {
        if (item.isFollowingThem.toString() === 'true') {
            return this.styles.followStar
        } else {
            return this.styles.notFollowStar
        }
    }

    fetchUserLinkedStartups() {
        if (this.state.isLoading == false) {
            this.setState({isLoading: true}, () => {
                bodyless(HttpHelper.addUrlParameter(ApiDictionary.getStartupsByUserId, [this.state.currentUser.userId])).then(result => {
                    if (result.success === 1) {
                        this.setState({
                            isLoading: false,
                            startups: result.data
                        });
                    } else {
                        this.setState({isLoading: false})
                    }
                })
                    .catch((error) => {
                        console.log(error);
                        this.setState({isLoading: false});
                    })
            })

        }
    }

    private clickedFollowStar(account: StartupWithFollow) {
        if (account.isFollowingThem.toString() === 'true') {
            account.isFollowingThem = false
        } else {
            account.isFollowingThem = true
        }
        this.forceUpdate();
        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.changeStartupFollow,
            [account.startupId, account.isFollowingThem ? 1 : 0])
        );
    }

    getCurrentUser() {
        if (this.state.isLoading == false) {
            this.setState({isLoading: true}, () => {
                bodyless(HttpHelper.addUrlParameter(ApiDictionary.getUserById, [this.state.currentUser.userId])).then((data) => {
                    if (data.success === 1) {
                        this.state.currentUser.setUser(data.data);
                        this.setState({isLoading: false})
                    } else {
                        console.log("iets is fout gegaan", data)
                        this.setState({isLoading: false})
                    }
                })
                    .catch((error) => {
                        console.log(error);
                        this.setState({isLoading: false});
                    })
            })
        }
    }

    telephoneComposer() {
        if (this.state.currentUser.telephone.toString()[0] === '0') {
            return this.state.currentUser.telephone
        }
        return "0" + this.state.currentUser.telephone
    }

    tabGenerator(category: string[]) {
        let categoryWidth = ((1 / category.length) * 100).toString() + '%'
        let categoryList = category.map((name) => {
                return (
                    <View style={[this.styles.category, {width: categoryWidth, backgroundColor: this.IstabSelected(name)}]}
                          key={name}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({selectedTab: name})
                        }}>
                            <Text style={this.styles.tabText} adjustsFontSizeToFit>{name}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                )
            }
        )

        return (
            <View style={{width: '100%', height: 50, flexDirection: 'row', backgroundColor: '#e3e8eb'}}>
                {categoryList}
            </View>
        )
    }

    IstabSelected(name: string) {
        const selected = 'white'
        const notSelected = '#e3e8eb'

        if (name === this.state.selectedTab) {
            return selected
        } else
            return notSelected
    }

    getBlogs(): any{
        let newBlogs;
        if (!this.state.isLoading) {
            this.setState({isLoading: true}, () => {
                bodyless(
                    HttpHelper.addUrlParameter(ApiDictionary.getUserPosts,
                        [this.state.currentUser.userId, 0]
                    ))
                    .then((result) => {
                        if (result.success === 1) {
                            this.setState({blogs: result.data, isLoading: false})
                            newBlogs = result.data
                        } else {
                            this.setState({isLoading: false})
                        }
                        // console.log(result.data[1])
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({isLoading: false});
                    })
            })
        }
        return newBlogs
    }

    styles = StyleSheet.create({
        textClickable: {
            color: 'blue',
            textDecorationLine: 'underline',
        },
        contactValue: {
            padding: 10,
            fontSize: 17,
        },
        contactText: {
            fontSize: 17,
            fontWeight: 'bold',
            padding: 10,
        },
        privacyButton: {
            flex: 15,
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center'
        },
        privacyIcon: {
            width: '35%',
            paddingTop: 5,
            flex: 1
        },
        privacyText: {
            color: 'grey',
            fontSize: 15,
            flex: 6,
            textAlign: 'center',
            fontWeight: 'bold'
        },

        privacyDivider: {
            flex: 1,
            borderColor: '#D3D3D3',
            borderLeftWidth: 1,
            borderRightWidth:1,
        },

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
        contactLeftTable: {
            color: colors.textPostContent,
            alignSelf: "auto",
            textAlignVertical: "center",
            textAlign: "left",
            fontWeight: 'bold',
            marginTop: 5
        },
        contactRightTable: {
            color: colors.textPostContent,
            alignSelf: "auto",
            textAlignVertical: "center",
            textAlign: "left",
            marginTop: 5
        },
        descriptionText: {
            fontStyle: 'italic',
            fontSize: 15,
            margin: 10,
            color: colors.textPostContent,
            alignSelf: "auto",
            textAlignVertical: "center",
            textAlign: "center",
        },
        category: {
            height: 50,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
        },
        nameBox: {
            height: this.windowWidth / 2.5,
            width: this.windowWidth / 2,
            margin: 5,
            alignContent: "center",
            backgroundColor: "#e3e8eb",
            marginTop: 50,
        },
        image: {
            height: this.windowWidth / 2.5,
            width: this.windowWidth / 2.5,
            borderWidth: 5,
            borderRadius: this.windowWidth / 5,
            marginLeft: 10, marginTop: 30,
            backgroundColor: "white",
            borderColor: 'white',
        },
        imagestyling: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
        },
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            backgroundColor: colors.backgroundSecondary
        },
        separator: {
            borderBottomColor: '#747474',
            borderBottomWidth: 1,
            marginHorizontal: 15,
            marginTop: 15
        },
        topScrollable: {
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: "#e3e8eb"
        },
        lowerScrollable: {
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: colors.backgroundPrimary
        },
        list: {
            width: '100%',
        },
        text: {
            color: colors.textPostContent,
            alignSelf: "auto",
            textAlignVertical: "center"
        },
        tabText: {
            fontSize: 17,
            margin: 10,
            color: colors.textPostContent,
            alignSelf: "auto",
            textAlignVertical: "center",
            textAlign: "center",
        }
    });
}
