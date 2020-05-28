import React from 'react';
import { StyleSheet, View } from 'react-native';
import MainNavigation from './navigation/MainNavigation';

export default function App() {
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
