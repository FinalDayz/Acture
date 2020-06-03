import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import EventsPlaceholderScreen from '../screens/EventsPlaceholderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';

const EventsScreenNavigation = createStackNavigator(
    {
        Events: {
            screen: EventsPlaceholderScreen
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
    });

export default createAppContainer(EventsScreenNavigation);