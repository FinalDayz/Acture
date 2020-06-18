import React, {Fragment} from 'react';
import {ScrollView, Button} from 'react-native';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Container, List} from 'native-base';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import {Post} from "../components/Post";
import {bodyfull} from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import {PostModel} from '../models/PostModel';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {User} from '../models/User'


export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    data: any; // PostModel[],
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
        if (!this.state.isLoading) {
            this.setState({isLoading: true}, () => {
                console.log("De state 1 is nu: " + this.state.isLoading)
                bodyfull(ApiDictionary.getFeed, {
                    offs: this.state.offset //offset for loading more posts
                })
                    .then(
                        (result) => {
                            // JSON.stringify(result.data.evenementId))
                            this.setState({
                                isLoading: false,
                                data: result.data
                            })
                        })
                    .catch((error) => {
                        console.log(error);
                        this.setState({isLoading: false});
                    })
            })
        }
    }


    showAttendance = (eventId: any) => {
        console.log('printing eventId: ')
        console.log(eventId)
        // console.log("THIS IS " + eventId)
        this.props.navigation.navigate('Attendance', {eventId: eventId})
    }

    handleDelete(postId: string) {
        console.log("helemaal hier, id: " + postId);
        // const newData = this.state.data.filter(
        //     (post) => post.postId.toString() !== postId
        // );
        //
        // this.setState({
        //     data: newData
        // })
    };

    getMorePosts() {
        this.state.offset + 15;
        this.getFeed();
    }


    render() {
        if (this.state.data[0] != null) {
            console.log(this.state.data[0].categoryId);
        }

        return (
            <Container style={this.styles.screen}>
                <Button title='nieuw' onPress={() => this.props.navigation.navigate('BlogAddScreen')}/>
                {this.state.isLoading ? (
                    <View style={this.styles.loading}>
                        <ActivityIndicator size="large" color={colors.primaryLight}/>
                    </View>
                ) : (<View></View>)}
                <View style={this.styles.scrollable}>
                    <FlatList
                        refreshing={false}
                        onRefresh={() => this.getFeed()}
                        contentContainerStyle={this.styles.list}
                        data={this.state.data}
                        keyExtractor={(item, index) => item.postId.toString()}
                        renderItem={(itemData) => {
                           // this.showAttendance(itemData.item.evenementId)
                            {console.log("HALLO" + (JSON.stringify(itemData.item))}
                             return <Post
                                navigation={this.props.navigation}
                                data={itemData.item}
                                onDelete={this.handleDelete}
                            />

                        }}

                        /*
                        * renderRow={(item) => {
                            item.handlePress= () => this.showAttendance(item)
                            return <Post data={item} />
                        }}
                        * 
                        * */
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
    static navigationOptions = (navData: any) => {
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

    styles = StyleSheet.create({
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
        },
        list: {
            width: '100%',
        }
    });
}
