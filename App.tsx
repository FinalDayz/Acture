import React from 'react';
import {Text, View} from 'react-native';

import LoginScreen from './screens/LoginScreen';
import Feed from './screens/Feed';
import {ActivateUsers} from "./components/admin/ActivateUsers";

export default function App() {
    return (
        <View style={{flex: 1,}}>
            {/*<LoginScreen/>*/}
            {/*<Feed/>*/}
            <ActivateUsers/>
        </View>
    );
}
