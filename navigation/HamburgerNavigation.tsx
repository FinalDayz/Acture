import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import BottomNavigation from './BottomNavigation';
import AboutScreen from '../screens/AboutScreen';
import returnToLoginScreen from './ReturnToLoginScreen';

import colors from '../constants/colors';

const HamburgerNavigation = createDrawerNavigator({
    BottomNav: { screen: BottomNavigation,
        navigationOptions: {
            title: "Menu Sluiten"
        }
    },
    About: { screen: AboutScreen,
        navigationOptions: {
            title: "Over ons"
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

