import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import MessagesPlaceholderScreen from '../screens/MessagesPlaceholderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';

const MessagesScreenNavigation = createStackNavigator(
    {
        Messages: {
            screen: MessagesPlaceholderScreen
        },
        Profile: {
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
    });

export default createAppContainer(MessagesScreenNavigation);