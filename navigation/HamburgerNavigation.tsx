import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import BottomNavigation from './BottomNavigation';
import MenuScreen from '../screens/MenuScreen';

import colors from '../constants/colors';
import {ActivateUsersScreen} from "../screens/ActivateUsersScreen";
import {ManageUsersScreen} from "../screens/ManageUsersScreen";

const MenuNavigation = createStackNavigator({
    Menu: MenuScreen
})

const HamburgerNavigation = createDrawerNavigator({
    BottomNav: BottomNavigation,
    Menu: MenuNavigation,
    manageUsers: ActivateUsersScreen,
}, {
    drawerBackgroundColor: colors.primary,
    contentOptions: {
        activeTintColor: colors.textLight,
        inactiveTintColor: colors.textLight
    }
});

export default createAppContainer(HamburgerNavigation);

