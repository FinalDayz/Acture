import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import FeedScreenNavigation from './FeedScreenNavigation';
import EventsScreenNavigation from './EventsScreenNavigation';
import MessagesScreenNavigation from './MessagesScreenNavigation';
import HelpScreenNavigation from './HelpScreenNavigation';
import ExploreScreenNavigation from './ExploreScreenNavigation';

import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const BottomNavigation = createMaterialBottomTabNavigator({
    Help: {screen: HelpScreenNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return(
                    <Ionicons name='help-circle' size={27} color={tabInfo.tintColor}/>
                );
            }
        }
    },
    Explore: {screen: ExploreScreenNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return(
                    <Ionicons name='md-compass' size={27} color={tabInfo.tintColor}/>
                );
            }
        }
    },
    Feed: {screen: FeedScreenNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return(
                    <Ionicons name='md-home' size={27} color={tabInfo.tintColor}/>
                );
            }
        }
    },
    Events: {screen: EventsScreenNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return(
                    <Ionicons name='md-calendar' size={27} color={tabInfo.tintColor}/>
                );
            }
        }
    },
    Messages: {screen: MessagesScreenNavigation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return(
                    <Ionicons name='md-mail' size={27} color={tabInfo.tintColor}/>
                );
            }
        }
    }
},{
        initialRouteName: 'Feed',
        activeColor: colors.textLight, //is a tintcolor, used in tabInfo
        inactiveColor: colors.textInactive, //is a tintcolor, used in tabInfo
        shifting: false, //important! Should be false!
        barStyle: { backgroundColor: colors.primary },
        labeled: false
    }
);

export default createAppContainer(BottomNavigation);
