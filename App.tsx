import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainNavigation from './navigation/MainNavigation';
import Firstattempt from './screens/firstattempt';
import PostAddScreen from '/screens/PostAddScreen';

export default function App() {
    return (
        // <MainNavigation/>
        <PostAddScreen/>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
