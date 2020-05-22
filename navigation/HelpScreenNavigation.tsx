import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HelpPlaceholderScreen from '../screens/HelpPlaceholderScreen';
import colors from '../constants/colors';

const HelpScreenNavigation = createStackNavigator(
    {
        Help: {
            screen: HelpPlaceholderScreen
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

export default createAppContainer(HelpScreenNavigation);