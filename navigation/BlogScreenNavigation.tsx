import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import BlogScreen from '../screens/BlogScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';
import PostAddScreen from '../screens/PostAddScreen';

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