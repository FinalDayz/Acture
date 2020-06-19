import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Container, List} from 'native-base';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import {Post} from "../components/Post";
import {bodyfull} from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import {PostModel} from '../models/PostModel';
import { NewPostButton } from '../components/NewPostButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { User } from '../models/User';


export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    data: PostModel[],
    offset: number
}

export default class FeedScreen extends React.Component<Props, State> {
    state: State;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            data: [],
            isLoading: false,
            offset: 0
        }
    }

    componentDidMount() {
        this.getFeed()
    }

    getFeed() {
        if(!this.state.isLoading) {
            this.setState({isLoading:true}, () => {
                bodyfull(ApiDictionary.getFeed, {
                    offs: this.state.offset //offset for loading more posts
                })
                .then((result) => {
                    if(result.success === 1) {
                        this.setState({
                            isLoading: false,
                            data: result.data
                        })
                    } else {
                        this.setState({isLoading:false})
                    }
                    })
                .catch ((error) => {
                    console.log(error);
                    this.setState({isLoading : false});
                })
            })
        }
    }
    
    handleEdit(postId: string) {
        console.log("bewerken1")
        this.props.navigation.navigate('PostAddScreen', {postId: postId})
    }

    handleDelete(postId: string) {
        const newData = this.state.data.filter(
            (post) => post.postId.toString() != postId
        );

        this.setState({
            data: newData
        })
    };

    getMorePosts() {
        let tempOffset = 15;
        this.setState({offset:tempOffset}, () => {this.getFeed()});
    }

    render() {
        return (
            <Container style={this.styles.screen}>
                <NewPostButton onPress={() => this.props.navigation.navigate('PostAddScreen')} />
                <View style={this.styles.scrollable}>
                    <FlatList
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.getFeed()}
                        contentContainerStyle={this.styles.list}
                        data={this.state.data}
                        keyExtractor={(item, index) => item.postId.toString()}
                        renderItem={itemData =>
                            <Post
                                data={itemData.item}
                                onEdit={this.handleEdit.bind(this)}
                                onDelete={this.handleDelete.bind(this)}
                            />
                        }
                    />
                </View>
            </Container>
        );
    }
 
    // <View>
    //     <TouchableOpacity onPress={this.getMorePosts}>
    //         <Text style={this.styles.postloader}>Meer posts laden</Text>
    //     </TouchableOpacity>
    // </View>
                    

    //options for header bar. Default options are in the navigator.
    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Feed', //Title in header bar
            title: 'Mijn feed', //Title in tab
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='profile'
                        iconName='md-person' //TODO: change to profile picture
                        onPress={() => {
                            navData.navigation.navigate('Profile', {id: User.getLoggedInUser().userId})
                        }}
                    />
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
    };

    styles = StyleSheet.create ({
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.backgroundPrimary
        },
        scrollable: {
            flex: 1,
            width: '100%',
            height: '100%'
        },
        postloader: {
            color: colors.textDark,
            marginBottom: 50
        },
        list: {
            width: '100%',
        }
    });
}
