import {createStackNavigator} from "react-navigation-stack";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../constants/colors";
import ManageUsersTabs from "./ManageUsersTabs";
import { createAppContainer } from "react-navigation";

const ManageUserNavigation = createStackNavigator(
    {
        manageUsers: {
            screen: ManageUsersTabs,
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
    }
);

export default createAppContainer(ManageUserNavigation);
