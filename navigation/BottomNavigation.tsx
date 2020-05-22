import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import FeedScreenNavigation from './FeedScreenNavigation';
import EventsScreenNavigation from './EventsScreenNavigation';
import MessagesScreenNavigation from './MessagesScreenNavigation';
import HelpScreenNavigation from './HelpScreenNavigation';
import ExploreScreenNavigation from './ExploreScreenNavigation';

import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

const BottomNavigation = createMaterialBottomTabNavigator({
    Help: HelpScreenNavigation,
    Explore: ExploreScreenNavigation,
    Feed: FeedScreenNavigation,
    Events: EventsScreenNavigation,
    Messages: MessagesScreenNavigation
},
{
    initialRouteName: 'Feed',
    activeColor: '#FFF',
    inactiveColor: '#BBB',
    shifting: false, //important! Should be false!
    barStyle: { backgroundColor: colors.primary }
}
);

//code below is a non-material version of the bottom navigation

// const MainNavigation = createBottomTabNavigator({
//     Help: HelpScreenNavigation,
//     Explore: ExploreScreenNavigation,
//     Feed: FeedScreenNavigation,
//     Events: EventsScreenNavigation,
//     Messages: MessagesScreenNavigation
// }
// );

export default createAppContainer(BottomNavigation);