import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';
import PostAddScreen from "../screens/PostAddScreen";

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
