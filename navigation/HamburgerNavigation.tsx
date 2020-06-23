import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import BottomNavigation from './BottomNavigation';
import MenuScreen from '../screens/MenuScreen';

import colors from '../constants/colors';
import {ActivateUsersScreen} from "../screens/ActivateUsersScreen";
import {ManageUsersScreen} from "../screens/ManageUsersScreen";
import ManageUserNavigation from "./ManagerUserNavigation";
import returnToLoginScreen from './ReturnToLoginScreen';


const HamburgerNavigation = createDrawerNavigator({
    BottomNav: { screen: BottomNavigation,
        navigationOptions: {
            title: "Menu Sluiten"
        }
    },
    logOutUser: { screen: returnToLoginScreen,
        navigationOptions: {
            title: "Uitloggen"
        }
    },
}, {
    drawerBackgroundColor: colors.primary,
    contentOptions: {
        activeTintColor: colors.textLight,
        inactiveTintColor: colors.textLight
    }
});

export default createAppContainer(HamburgerNavigation);

