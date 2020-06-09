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
        'Personen': ExploreUsersScreen,
        'Startups': ExploreUsersScreen,
        'Vakgebieden': ExploreUsersScreen,
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

                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            },
        }
    }
);

// Options for header bar. Default options are in the navigator.
// exploreTabs.navigationOptions = (navData:any) => {
//     return {
//         headerTitle: 'Explore (Placeholder)',
//         headerRight: () => (
//             <HeaderButtons HeaderButtonComponent={HeaderButton}>
//                 <Item
//                     title='profile'
//                     iconName='md-person' //TODO: change to profile picture
//                     onPress={() => {
//                         navData.navigation.navigate('Profile');
//                     }}/>
//             </HeaderButtons>
//         ),
//         headerLeft: () => (
//             <HeaderButtons HeaderButtonComponent={HeaderButton}>
//                 <Item
//                     title='menu'
//                     iconName='md-menu'
//                     onPress={() => {
//                         navData.navigation.toggleDrawer();
//                     }}
//                 />
//             </HeaderButtons>
//         )
//     }
// };

export default exploreTabs;
