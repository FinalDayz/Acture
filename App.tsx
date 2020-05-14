import React from 'react';
import { StyleSheet, View } from 'react-native';

import Post from './components/Post';

export default function App() {
    return (
        <View style={styles.screen}>
            <Post></Post>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
