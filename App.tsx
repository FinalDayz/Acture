import React from 'react';
import { StyleSheet, View } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import RegisteringScreen from './screens/RegisteringScreen';

export default function App() {
    return (
        <View style={{flex: 1,}}>
            <RegisteringScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
