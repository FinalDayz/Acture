import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import colors from '../constants/colors';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreenTabs from "./ExploreScreenTabs";

const ExploreScreenNavigation = createStackNavigator(
    {
        Explore: ExploreScreenTabs,
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

export default createAppContainer(ExploreScreenNavigation);
