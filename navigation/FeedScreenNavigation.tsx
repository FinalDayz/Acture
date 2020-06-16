import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';
import PostAddScreen from "../screens/PostAddScreen";
import BlogAddScreen from "../screens/BlogAddScreen";



const FeedScreenNavigation = createStackNavigator(
    {
        Feed: {
            screen: FeedScreen
        },
        Profile: {
            screen: ProfileScreen
        },
        PostAddScreen:{
            screen: PostAddScreen
        },
        BlogAddScreen:{
            screen: BlogAddScreen
        },
        userPrivacyScreen: {
            screen: userPrivacyScreen
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

export default createAppContainer(FeedScreenNavigation);
