import React from 'react';
import { StyleSheet, View } from 'react-native';

import Feed from './screens/Feed';

export default function App() {
    return (
        <View style={styles.screen}>
            <Feed/>
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
