import React from 'react';
import { View } from 'react-native';

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
