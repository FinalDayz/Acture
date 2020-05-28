import React from 'react';
import { StyleSheet, View } from 'react-native';

// import MainNavigation from './navigation/MainNavigation';
import LoginScreen from './screens/LoginScreen';
// import {AdminAddScreen} from "./screens/AdminAddScreen";

import MainNavigation from './navigation/MainNavigation';

export default function App() {
    return (
        // <View style={styles.screen}>
        //     <LoginScreen/>
        // </View>

            <MainNavigation/>
        //<MainNavigation style={styles.screen} />
// <AdminAddScreen/>
        // <View style={styles.screen}>
        //     <Feed/>
        // </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
