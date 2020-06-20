import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, FlatList } from 'react-native';
import colors from '../constants/colors';
import bodyless, { bodyfull } from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";
import {PostModel} from "../models/PostModel";
import {List, Container} from "native-base";
import {Post} from "../components/Post";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import  { HttpHelper } from '../components/HttpHelper';
import { User } from '../models/User';
import { UserRole } from '../models/UserRole';
import { SafeAreaView } from 'react-native-safe-area-context';
import { runInThisContext } from 'vm';
import { Startup } from '../models/Startup';

export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    blogs: PostModel[],
    currentUser: User,
    selectedTab: string,
    startups: Startup[],
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
            isLoading: false,
            selectedTab: 'Over',
            startups: []
        }

        this._isMounted = false;

        const navigation = this.props.navigation;
        this.state.currentUser.userId = this.props.navigation.state.params.id
    }

    componentDidMount() {
        this.getCurrentUser()
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    
    //options for header bar. Default options are in the navigator.
    navigationOptions = {
        headerTitle: 'Profiel'
    };

    // getStartupData() {
    //     bodyless(HttpHelper.addUrlParameter(ApiDictionary.getStartupById, [this.state.id]))
    // }

    render() {
        
        return(
            <View style={this.styles.screen}>
                {/* <Container style={this.styles.topScrollable}>                
                    <View style={this.styles.imagestyling}>
                        <View>
                            <Image
                            style={this.styles.image}
                            source={{uri: 'https://i.imgur.com/Ngq9RoP.jpg'}}
                            resizeMode="cover"
                            />
                        </View>
                        <Container style={this.styles.nameBox}>
                            <Text style={this.styles.text} adjustsFontSizeToFit numberOfLines={2}>{this.getFullName()}</Text>
                        </Container>
                    </View>
                </Container> */}
                {/* {this.tabGenerator(['Over', 'Startups', 'Contact'])} */}
                
                 {/* TODO: Tab-specific content on top*/}
                {/* <View>
                    <View style={this.styles.separator} />
                </View> */}
                
                

                <View style={this.styles.lowerScrollable}>
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
                                onDelete={this.handleDelete.bind(this)}
                            />
                        }
                    />
                </View>
            </View>
        );
    }

    headerBinder() {
        return(
            <View>
            <Container style={this.styles.topScrollable}>                
                    <View style={this.styles.imagestyling}>
                        <View>
                            <Image
                            style={this.styles.image}
                            source={{uri: 'https://i.imgur.com/Ngq9RoP.jpg'}}
                            resizeMode="cover"
                            />
                        </View>
                        <Container style={this.styles.nameBox}>
                            <Text style={[this.styles.text, {textAlign: "center"}]} adjustsFontSizeToFit numberOfLines={2}>{this.state.currentUser.getFullName()}</Text>
                        </Container>
                    </View>
            </Container>
            {this.tabGenerator(['Over', 'Startups', 'Contact'])}
            {this.tabRouter()}
            </View>
        )
    }

    tabRouter() {
        switch(this.state.selectedTab) {

            case 'Over':
                return (
                    <View style={{marginHorizontal: "7%"}}>
                        <Text style={this.styles.descriptionText}>{this.state.currentUser.description}</Text>
                        <View style={this.styles.separator} />
                    </View>
                    
                );
                
            case 'Startups':
                return (
                    <View style={{marginHorizontal: "7%"}}>
                        <Text style={[this.styles.descriptionText, {textAlign: 'center'}]}>{this.state.currentUser.firstname + " is aangesloten bij deze startups:"}</Text>

                        <View style={this.styles.separator} />
                    </View>
                );

            case 'Contact':
                return (
                    <View></View>
                );
        }
    }

    
    getCurrentUser() {
        if(this.state.isLoading == false) {
            this.setState({isLoading:true}, () => {
                bodyless(HttpHelper.addUrlParameter(ApiDictionary.getUserById, [this.state.currentUser.userId])).then((data) => {
                    if(data.success === 1) {
                        this.state.currentUser.setUser(data.data)
                        this.setState({isLoading: false})
                        this.getBlogs()
                    } else {
                        console.log("bigoof", data)
                        this.setState({isLoading: false})
                    }
                })
                bodyless(HttpHelper.addUrlParameter(
                    ApiDictionary.getStartupsByUserId, [this.state.currentUser.userId])
                ).then(result => {
                    this.setState({
                        isLoading: false,
                        startups: result.data
                    });
                });
            })
        }   
    }

    tabGenerator(category: string[]) {
        let categoryWidth = ((1/category.length) * 100).toString() + '%'
        let categoryList = category.map((name) => {
                return(
                    <View style={[this.styles.category, {width: categoryWidth, backgroundColor: this.IstabSelected(name)}]} 
                    key={name}>
                        <TouchableWithoutFeedback onPress={() => {this.setState({selectedTab:name})}}>
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

        if(name === this.state.selectedTab) {
            return selected
        }
        return notSelected
    }

    getBlogs() {
        if(!this.state.isLoading) {
            this.setState({isLoading:true}, () => {
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
                    this.setState({isLoading : false});
                })
            })  
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
        descriptionTable: {
            height: '100%',
            width: this.windowWidth/2, 
            padding: 10,
            alignContent: "center",
        },
        descriptionText: {
            fontStyle: 'italic',
            fontSize: 15,
            margin: 10,
            color: colors.textPostContent,
            alignSelf: "auto", 
            textAlignVertical: "center",
            textAlign: "left",
        },
        category: {
            height: 50,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
        },
        nameBox: {
            height: this.windowWidth/2.5, 
            width: this.windowWidth/2, 
            margin: 5, 
            alignContent: "center",
            backgroundColor: "#e3e8eb",
            marginTop: 50,
        },
        image: {
            height: this.windowWidth/2.5,
            width: this.windowWidth/2.5,
            borderWidth: 5,
            borderRadius: this.windowWidth/5,
            marginLeft: 10, marginTop: 30,
            backgroundColor: "yellow",
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
        scrollable: {
            flex: 1,
            width: '100%',
            height: '100%',
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
            // marginHorizontal: 15,
            // fontSize: 15,
            color: colors.textPostContent,
            alignSelf: "auto", 
            textAlignVertical: "center"
        },
        tabText: {
            // marginHorizontal: 15,
            fontSize: 17,
            margin: 10,
            color: colors.textPostContent,
            alignSelf: "auto", 
            textAlignVertical: "center",
            textAlign: "center",
            
        }
    });
}
