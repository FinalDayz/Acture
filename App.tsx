import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainNavigation from './navigation/MainNavigation';
import PostAddScreen from "./screens/PostAddScreen";

export default function App() {
    console.disableYellowBox = true;
    return (
        <MainNavigation/>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
