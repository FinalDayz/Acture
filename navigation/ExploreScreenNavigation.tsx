import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import colors from '../constants/colors';
import ExplorePlaceholderScreen from '../screens/ExplorePlaceholderScreen';
import ProfileScreen from '../screens/ProfileScreen';

const ExploreScreenNavigation = createStackNavigator(
    {
        Explore: {
            screen: ExplorePlaceholderScreen
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

export default createAppContainer(ExploreScreenNavigation);