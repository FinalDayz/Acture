import React from "react";
import {ManageUsersScreen} from "./ManageUsersScreen";
import {ActivateUsersScreen} from "./ActivateUsersScreen";
import {View} from "react-native";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

export interface Props {

}

export interface State {
    tabs: any
}

export class ManageUsersTabs extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);


        console.log("CALLED ManageUsersTabs");
    }


    render() {
        const Tab = createMaterialTopTabNavigator();
        console.log("RENDER::", Tab);
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={ManageUsersScreen} />
                <Tab.Screen name="Settings" component={ActivateUsersScreen} />
            </Tab.Navigator>
        );
    }
}


