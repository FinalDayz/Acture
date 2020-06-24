import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import colors from "../constants/colors";
import FeedScreen from '../screens/FeedScreen';
import GlobalFeedScreen from '../screens/GlobalFeedScreen';

const FeedScreenTabs = createMaterialTopTabNavigator(
    {
        myFeed: {
            screen: FeedScreen
        },
        globalFeed: {
            screen: GlobalFeedScreen
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
