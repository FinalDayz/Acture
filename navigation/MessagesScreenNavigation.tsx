import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import MessagesPlaceholderScreen from '../screens/MessagesPlaceholderScreen';

const MessagesScreenNavigation = createStackNavigator({
    Messages: MessagesPlaceholderScreen
});

export default createAppContainer(MessagesScreenNavigation);