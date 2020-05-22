import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Post from '../components/Post';
import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';

export interface Props {}

const FeedScreen = (props: Props) => {
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
                    iconName='ios-menu'
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