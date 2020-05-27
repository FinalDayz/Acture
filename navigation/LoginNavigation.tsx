import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HelpPlaceholderScreen from '../screens/HelpPlaceholderScreen';
import colors from '../constants/colors';
import ProfileScreen from '../screens/ProfileScreen';

const LoginNavigation = createStackNavigator(
    {
        Login: {
            screen: HelpPlaceholderScreen
        },
        Register: {
            screen: ProfileScreen
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

export default createAppContainer(LoginNavigation);