import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Post from '../components/Post';

export interface Props {}

const Feed = (props: Props) => {
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

const styles = StyleSheet.create ({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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

export default Feed;