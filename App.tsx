import React from 'react';
import { View } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import RegisteringScreen from './screens/RegisteringScreen';

export default function App() {
    return (
        <View style={{flex: 1,}}>
            <RegisteringScreen />
        </View>
    );
}