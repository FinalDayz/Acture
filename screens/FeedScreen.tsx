import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { bodyless } from '../components/HttpClient';
import Post from '../components/Post';
import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import ApiDictionary from '../constants/ApiDictionary'

export interface Props {}

const FeedScreen = (props: Props) => {

    // const [feedPosts, setFeedPosts] = useState({});
    
    // useEffect(() => {
    //     console.log(ApiDictionary.feed.destination)
    //     fetch(ApiDictionary.feed.destination, {
    //         method: 'GET', 
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((response:any) => {
    //         console.log(response)
    //         setFeedPosts(response)
    //     }).catch((error:any) => {
    //         console.log(error)
    //     })
    // },[feedPosts])

    return(
        <View style={styles.screen}>
            <ScrollView style={styles.scrollable}>

                <View style={styles.postContainer}>
                    <Post/>
                </View>
                <View style={styles.postContainer}>
                    <Post/>
                </View>
                <View style={styles.postContainer}>
                    <Post/>
                </View>
                <View style={styles.postContainer}>
                    <Post/>
                </View>
                <View style={styles.postContainer}>
                    <Post/>
                </View>
                <View style={styles.postContainer}>
                    <Post/>
                </View>
                <View style={styles.postContainer}>
                    <Post/>
                </View>
            </ScrollView>
        </View>
    );
};

//options for header bar. Default options are in the navigator.
FeedScreen.navigationOptions = (navData:any) => {
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

const styles = StyleSheet.create ({
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
    }
});

export default FeedScreen;