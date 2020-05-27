import React from 'react';
import { StyleSheet, View } from 'react-native';

import MainNavigation from './navigation/MainNavigation';

export default function App() {
    return (
        // <View style={styles.screen}>
            <MainNavigation/>
        // </View>

        //<MainNavigation style={styles.screen} />

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
