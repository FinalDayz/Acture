import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import colors from '../constants/colors';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreenTabs from "./ExploreScreenTabs";
import ManageUsersTabs from './ManageUsersTabs';
import StartupScreen from "../screens/StartupScreen";
import AboutScreen from '../screens/AboutScreen';

const ExploreScreenNavigation = createStackNavigator(
    {
        Explore: ExploreScreenTabs,
        Profile: {
            screen: ProfileScreen
        },
        Startup: {
            screen: StartupScreen
        },
        ManageUsers: {
            screen: ManageUsersTabs
        },
        About: {
            screen: AboutScreen
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.primary
            },
            headerTintColor: colors.textLight
        }
    });

export default createAppContainer(ExploreScreenNavigation);
