import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HamburgerNavigation from './HamburgerNavigation';
import LoginNavigation from './LoginNavigation';

import colors from '../constants/colors';

const MainNavigation = createSwitchNavigator({
    Login: LoginNavigation,
    Home: HamburgerNavigation
    },{
        initialRouteName: 'Login'
    }
);

export default createAppContainer(MainNavigation);
