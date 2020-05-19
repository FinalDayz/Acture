import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Post from '../components/Post';
import colors from '../constants/colors';
import FeedScreenNavigation from '../navigation/FeedScreenNavigation';

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

//options for header bar
FeedScreen.navigationOptions = {
    headerTitle: 'Feed',
    headerStyle: {
        backgroundColor: colors.primary
    },
    headerTintColor: colors.textLight
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