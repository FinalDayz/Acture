import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HelpPlaceholderScreen from '../screens/HelpPlaceholderScreen';

const HelpScreenNavigation = createStackNavigator({
    Help: HelpPlaceholderScreen
});

export default createAppContainer(HelpScreenNavigation);