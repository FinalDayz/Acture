import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HelpScreen from '../screens/HelpScreen';
import colors from '../constants/colors';
import ProfileScreen from '../screens/ProfileScreen';

import PostAddScreen from "../screens/PostAddScreen";
import BlogAddScreen from "../screens/BlogAddScreen";

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
        BlogAddScreen:{
            screen: BlogAddScreen
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