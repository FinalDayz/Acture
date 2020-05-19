import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import EventsPlaceholderScreen from '../screens/EventsPlaceholderScreen';

const EventsScreenNavigation = createStackNavigator({
    Events: EventsPlaceholderScreen
});

export default createAppContainer(EventsScreenNavigation);