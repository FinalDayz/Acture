import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Container, List} from 'native-base';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import { Post } from "../components/Post";
import {bodyfull} from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import { PostModel } from '../models/PostModel';

interface State {

    isLoading: boolean,
    data: any; // PostModel[],
    offset: number
}

export default class AllEventsScreen extends React.Component<any, any> {
    state : State;
 
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            offset: 0
        }
    }

    componentDidMount() {
        this.getEvents()
    }
    
    getEvents() {
        if(!this.state.isLoading) {
            
            this.setState({isLoading:true}, () => {
                bodyfull(ApiDictionary.getEvents, {
                    offs: this.state.offset //offset for loading more posts
                })
                .then(
                    (result: {data:Array<PostModel>}) => {
                        this.setState({
                            isLoading: false,
                            data: result.data
                        })
                    })
                .catch ((error) => {
                    console.log(error);
                })
            })
        }
    }

    handleDelete(postId: string) {
        console.log("helemaal hier: ");
        const newData = this.state.data.filter(
            (post) => post.postId.toString() !== postId
        );

        this.setState({
            data: newData
        })
    };

    showAttendance= (eventId: any) => {
        console.log('printing eventId: ')
        // console.log(eventId)
        // console.log("THIS IS " + eventId)
        this.props.navigation.navigate('Attendance', {eventId: eventId})
    }

    render() {
        return(
            <Container style={this.styles.screen}>
                <View style={this.styles.scrollable}>
                <FlatList
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.getEvents()}
                        contentContainerStyle={this.styles.list}
                        data={this.state.data}
                        keyExtractor={(item, index) => item.postId.toString()}
                        renderItem={itemData =>
                            <Post
                                // refreshEvents = {() =>this.getEvents()}
                                handlePress= {()=>{this.showAttendance(itemData.item.evenementId)}}
                                navigation={this.props.navigation}
                                data={itemData.item}
                                onDelete={this.handleDelete}
                            />
                        }
                    />
                </View>     
            </Container>
        );
    }

    //options for header bar. Default options are in the navigator.
    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Evenementen',
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
        loading: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        list: {
            width: '100%',
        }
    });
}
