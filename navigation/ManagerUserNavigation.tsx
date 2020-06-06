import {createStackNavigator} from "react-navigation-stack";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../constants/colors";
import React from "react";
import ManageUsersTabs from "../screens/ManageUsersTabs";

export default createStackNavigator(
    {
        'Gebruikers beheren': {
            screen: ManageUsersTabs
        },
        Profile: {
            screen: ProfileScreen
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.primary
            },
            headerTintColor: colors.textLight
        }
    }
);
