import React from "react";
import {ManageUsersScreen} from "../screens/ManageUsersScreen";
import {ActivateUsersScreen} from "../screens/ActivateUsersScreen";
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import colors from "../constants/colors";
import {ExploreUsersScreen} from "../screens/Explore/ExploreUsersScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const exploreTabs = createMaterialTopTabNavigator(
    {
        Personen: ExploreUsersScreen,
        Startups: ExploreUsersScreen
    }, {
        initialRouteName: 'Personen',
        tabBarOptions: {
            inactiveTintColor: colors.textGrey,
            activeTintColor: colors.textGrey,
            indicatorStyle: {
                backgroundColor: colors.primary
            },
            tabStyle: {},
            style: {

                backgroundColor: colors.backgroundPrimary,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            },
        },
        navigationOptions: ExploreUsersScreen.navigationOptions
    }
);

export default exploreTabs;
