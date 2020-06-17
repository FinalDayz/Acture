import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import colors from "../constants/colors";
import {ExploreUsersScreen} from "../screens/Explore/ExploreUsersScreen";
import FeedScreen from '../screens/FeedScreen';
import { createAppContainer } from "react-navigation";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const FeedScreenTabs = createMaterialTopTabNavigator(
    {
        myFeed: {
            screen: FeedScreen
        },
        globalFeed: {
            screen: FeedScreen
        },
        
    }, {
        initialRouteName: 'myFeed',
        tabBarOptions: {
            inactiveTintColor: colors.textGrey,
            activeTintColor: colors.textGrey,
            indicatorStyle: {
                backgroundColor: colors.primary
            },
            tabStyle: {},
            style: {

                backgroundColor: colors.backgroundPrimary,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            },
        },
        navigationOptions: FeedScreen.navigationOptions
    }
);

export default FeedScreenTabs;
