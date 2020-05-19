import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import FeedScreen from '../screens/FeedScreen';

const FeedScreenNavigation = createStackNavigator({
    Feed: FeedScreen
});

export default createAppContainer(FeedScreenNavigation);