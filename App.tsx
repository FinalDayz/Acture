import React from 'react';
import { StyleSheet, View } from 'react-native';

import HamburgerNavigation from './navigation/HamburgerNavigation';

export default function App() {
    return (
        // <View style={styles.screen}>
            <HamburgerNavigation/>
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
