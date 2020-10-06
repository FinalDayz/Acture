import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import BlogScreen from '../screens/BlogScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';
import PostAddScreen from '../screens/PostAddScreen';
import AboutScreen from '../screens/AboutScreen';

const BlogScreenNavigation = createStackNavigator(
    {
        Blogs: {
            screen: BlogScreen
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
    });

export default createAppContainer(BlogScreenNavigation);