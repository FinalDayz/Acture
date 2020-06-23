import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import AllEventsScreen from '../screens/AllEventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';
import AttendanceScreen from '../screens/AttendanceScreen';
import PostAddScreen from '../screens/PostAddScreen';
import AttendanceScreen from '../screens/AttendanceScreen';

const EventsScreenNavigation = createStackNavigator(
    {
        Events: {
            screen: AllEventsScreen
        },
        Profile: {
            screen: ProfileScreen
        },
        PostAddScreen:{
            screen: PostAddScreen
        },
        Attendance: {
            screen: AttendanceScreen
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
