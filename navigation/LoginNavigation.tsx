import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import colors from '../constants/colors';

const LoginNavigation = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        }
    }
);

export default createAppContainer(LoginNavigation);