import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
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
                id: "1",
                offs: this.state.offset //offset for loading more posts
            })
            .then(
                (result: {data:Array<PostModel>}) => {
                    //let feedlist = this.state.data.concat(result.data);
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
        this.state.offset = this.state.offset + 15;
        this.getFeed();
    }


    render() {
        return(
            <Container>
                <View>
                    <Button title="joejoe" onPress={() => {}}/>
                </View>
                <View>
                    <List
                        dataArray={this.state.data}
                        renderRow={(item) => {
                            return <Post data={item}/>
                        }}
                    />
                <View>
                    <TouchableOpacity onPress={this.getMorePosts}>
                        <Text style={this.styles.postloader}>Meer posts laden</Text>
                    </TouchableOpacity>
                </View> 
                </View>
                
                
            </Container>
        );
    }

    
    

    //options for header bar. Default options are in the navigator.
    navigationOptions = (navData:any) => {
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
        postContainer: {
            alignSelf: 'center',
            marginVertical: 10,
            alignItems: 'center',
            width: '85%',
            minWidth: 200 //minimale breedte van een post
        },
        postloader: {
            color: colors.textDark,
            marginBottom: 50
        }
    });
}
