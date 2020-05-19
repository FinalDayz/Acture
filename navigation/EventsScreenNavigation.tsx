import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import EventsPlaceholderScreen from '../screens/EventsPlaceholderScreen';
import colors from '../constants/colors';

const EventsScreenNavigation = createStackNavigator(
    {
        Events: {
            screen: EventsPlaceholderScreen
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

export default createAppContainer(EventsScreenNavigation);