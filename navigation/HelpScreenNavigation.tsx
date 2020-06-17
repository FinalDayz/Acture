import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HelpScreen from '../screens/HelpScreen';
import colors from '../constants/colors';
import ProfileScreen from '../screens/ProfileScreen';

const HelpScreenNavigation = createStackNavigator(
    {
        Help: {
            screen: HelpScreen
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
    },
    );

export default createAppContainer(HelpScreenNavigation);