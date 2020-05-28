import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import colors from '../constants/colors';

const LoginNavigation = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.primary,
                shadowOpacity: 0,
                elevation: 0,
            },
            headerTintColor: colors.primary
        }
    }
);

export default createAppContainer(LoginNavigation);