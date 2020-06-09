import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

interface Props {

}

export class ExploreUsersScreen extends React.Component<Props> {

    navigationOptions() {

    }

    render() {
        return (
            <View style={styles.screen}>
                <Text>Explore placeholder</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        backgroundColor: colors.backgroundPrimary
    }
});


