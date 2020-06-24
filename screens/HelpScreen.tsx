import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import {bodyfull} from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import {PostModel} from '../models/PostModel';
import { Post } from '../components/Post';
import { NewPostButton } from '../components/NewPostButton';
import { User } from '../models/User';
import { UserRole } from '../models/UserRole';

export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    data: PostModel[]
}

let offSet = 0;

export default class HelpScreen extends React.Component<Props, State> {

    state: State;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            data: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.getGuides()
    }

    getGuides() {
        if(!this.state.isLoading) {
            this.setState({isLoading:true}, () => {
                bodyfull(ApiDictionary.getGuides, {
                    offs: offSet //offset for loading more posts
                })
                .then((result) => {
                    if(result.success === 1) {
                        var addedData = this.state.data.concat(result.data);
                        this.setState({
                            isLoading: false,
                            data: addedData
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

    handleEdit(data: any) {
        this.props.navigation.navigate('PostAddScreen', { edit: true, data: data})
    }

    handleDelete(postId: string) {
        const newData = this.state.data.filter(
            (post) => post.postId.toString() !== postId
        );

        this.setState({
            data: newData
        })
    };

    increaseOffset() {
        offSet = offSet + 10;
    }

    resetOffset() {
        this.setState({data: []})
        offSet = 0;
    }

    render() {
        return(

            <View style={this.styles.screen}>
                {
                    User.getRole() !== UserRole.user && 
                    <NewPostButton onPress={() => this.props.navigation.navigate('PostAddScreen', {edit: false})} />
                }


                {
                    User.getRole() !== UserRole.user ? (
                        <View style={this.styles.scrollable}>
                            <FlatList
                                refreshing={this.state.isLoading}
                                onRefresh={() => {this.resetOffset(); this.getGuides()}}
                                contentContainerStyle={this.styles.list}
                                data={this.state.data}
                                keyExtractor={(item, index) => item.postId.toString()}
                                renderItem={itemData =>
                                    <Post
                                        data={itemData.item}
                                        onDelete={this.handleDelete.bind(this)}
                                        onEdit={this.handleEdit}
                                    />
                                }
                                ListFooterComponent={
                                    <View>
                                        {!this.state.isLoading ? (
                                            <View style={this.styles.postloader}>
                                                <TouchableOpacity onPress={() => {this.increaseOffset(); this.getGuides() }}>
                                                    <Text style={this.styles.postloaderText}>Meer guides laden</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : null }
                                    </View>
                                }
                            />
                        </View>
                    ): (
                        <View style={this.styles.postloader}>
                                        {/* <TouchableOpacity onPress={() => {this.increaseOffset(); this.getFeed() }}> */}
                                            <Text style={this.styles.postloaderText}>Word lid om dit te zien</Text>
                                        {/* </TouchableOpacity> */}
                                    </View>
                    )
                }
            </View>
        );
    }


    //options for header bar. Default options are in the navigator.
    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Guides',
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

    styles = StyleSheet.create ({
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            backgroundColor: colors.backgroundPrimary
        },
        scrollable: {
            flex: 1,
            width: '100%',
            height: '100%'
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
        list: {
            width: '100%',
        }
    });
}    
