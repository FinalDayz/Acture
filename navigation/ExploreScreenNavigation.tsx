import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import colors from '../constants/colors';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreenTabs from "./ExploreScreenTabs";
import ManageUsersTabs from './ManageUsersTabs';

const ExploreScreenNavigation = createStackNavigator(
    {
        Explore: ExploreScreenTabs,
        Profile: {
            screen: ProfileScreen
        },
        ManageUsers: {screen: ManageUsersTabs}
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.primary
            },
            headerTintColor: colors.textLight
        }
    });

export default createAppContainer(ExploreScreenNavigation);
