import React from "react";
import {ManageUsersScreen} from "./ManageUsersScreen";
import {ActivateUsersScreen} from "./ActivateUsersScreen";
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import colors from "../constants/colors";

export default createMaterialTopTabNavigator(
    {
        'Beheren': ManageUsersScreen,
        'Activeren': ActivateUsersScreen,
    }, {
        initialRouteName: 'Beheren',
        tabBarOptions: {
            inactiveTintColor: colors.textGrey,
            activeTintColor: colors.textGrey,
            indicatorStyle: {
                backgroundColor: colors.primary
            },
            tabStyle: {},
            style: {

                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            },
        }
    }
);
