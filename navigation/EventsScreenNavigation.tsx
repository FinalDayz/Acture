import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import AllEventsScreen from '../screens/AllEventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';
import AttendanceScreen from '../screens/AttendanceScreen';
import PostAddScreen from '../screens/PostAddScreen';
import AboutScreen from '../screens/AboutScreen';

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
        },
        About: {
            screen: AboutScreen
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
