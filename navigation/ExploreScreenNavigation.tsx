import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import ExplorePlaceholderScreen from '../screens/ExplorePlaceholderScreen';

const ExploreScreenNavigation = createStackNavigator({
    Explore: ExplorePlaceholderScreen
});

export default createAppContainer(ExploreScreenNavigation);