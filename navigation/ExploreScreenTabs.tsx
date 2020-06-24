import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import colors from "../constants/colors";
import {ExploreUsersScreen} from "../screens/Explore/ExploreUsersScreen";
import {ExploreStartupsScreen} from "../screens/Explore/ExploreStartupsScreen";

const exploreTabs = createMaterialTopTabNavigator(
    {
        Personen: ExploreUsersScreen,
        Startups: ExploreStartupsScreen
    }, {
        initialRouteName: 'Personen',
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
        navigationOptions: ExploreUsersScreen.navigationOptions
    }
);

export default exploreTabs;
