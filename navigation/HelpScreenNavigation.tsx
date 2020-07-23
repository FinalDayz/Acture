import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HelpScreen from '../screens/HelpScreen';
import colors from '../constants/colors';
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';
import PostAddScreen from "../screens/PostAddScreen";

const HelpScreenNavigation = createStackNavigator(
    {
        Help: {
            screen: HelpScreen
        },
        Profile: {
            screen: ProfileScreen
        },
        PostAddScreen:{
            screen: PostAddScreen
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
    },
    );

export default createAppContainer(HelpScreenNavigation);
