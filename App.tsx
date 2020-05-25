import React from 'react';
import { StyleSheet, View } from 'react-native';

import MainNavigation from './navigation/MainNavigation';
import LoginScreen from './screens/LoginScreen';
import  {AdminAddScreen} from "./screens/AdminAddScreen";
import {Header} from "react-native/Libraries/NewAppScreen";

export default function App() {
    return (
        // <View style={{flex: 1,}}>
        //     <LoginScreen />
        // </View>
        <AdminAddScreen/>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

