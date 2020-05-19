import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

export interface Props {}

const ExplorePlaceholderScreen = (props: Props) => {
    return(
        <View style={styles.screen}>
            <Text>Explore placeholder</Text>
        </View>
    );
};

//options for header bar
ExplorePlaceholderScreen.navigationOptions = {
    headerTitle: 'Explore (Placeholder)',
    headerStyle: {
        backgroundColor: colors.primary
    },
    headerTintColor: colors.textLight
};

const styles = StyleSheet.create ({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        backgroundColor: colors.backgroundPrimary
    }
});

export default ExplorePlaceholderScreen;