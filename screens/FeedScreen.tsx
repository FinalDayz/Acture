import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Container, List} from 'native-base';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import {Post} from "../components/Post";
import {bodyfull} from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import {PostModel} from '../models/PostModel';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class FeedScreen extends React.Component<any, any> {

    state = {
        isLoading: false,
        data: [],
        offset: 0
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.getFeed()
    }
    
    getFeed() {
        if(!this.state.isLoading) {
            
            this.state.isLoading = true;
            bodyfull(ApiDictionary.getFeed, {
                offs: this.state.offset //offset for loading more posts
            })
            .then(
                (result: {data:Array<PostModel>}) => {
                    this.setState({data: result.data})
                })
                .catch ((error) => {
                        console.log(error);
                    })
        } else {
            return null
        }
    }

    getMorePosts() {
        this.state.offset + 15;
        this.getFeed();
    }

    render() {
        return(
            <Container style={this.styles.screen}>
                {!this.state.isLoading ? (
                        <View style={this.styles.loading}>
                            <ActivityIndicator size="large" color={colors.primaryLight}/>
                        </View>
                    ) : (<View></View>)}
                <View style={this.styles.scrollable}>
                    <List
                        dataArray={this.state.data}
                        renderRow={(item) => {
                            return <Post data={item}/>
                        }}
                    />
                </View>     
            </Container>
        );
    }

                    // {/* <View>
                    //     <TouchableOpacity onPress={this.getMorePosts}>
                    //         <Text style={this.styles.postloader}>Meer posts laden</Text>
                    //     </TouchableOpacity>
                    // </View>  */}

    //options for header bar. Default options are in the navigator.
    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Feed',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='profile'
                        iconName='md-person' //TODO: change to profile picture
                        onPress={() => {
                            navData.navigation.navigate('Profile');
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
        loading: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
}
