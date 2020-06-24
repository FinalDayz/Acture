import {ManageUsersScreen} from "../screens/ManageUsersScreen";
import {ActivateUsersScreen} from "../screens/ActivateUsersScreen";
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import colors from "../constants/colors";

const ManageUsersTabs = createMaterialTopTabNavigator(
    {
        Beheren: {screen: ManageUsersScreen },
        Activeren: {screen: ActivateUsersScreen },
    }, {
        initialRouteName: 'Beheren',
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
        navigationOptions: ManageUsersScreen.navigationOptions
    }
);

export default ManageUsersTabs;