import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisteringScreen'
import colors from '../constants/colors';

const LoginNavigation = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.primary,
                shadowOpacity: 0,
                elevation: 0,
                
            },
            headerTintColor: colors.textLight,
            
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