import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

export interface Props {}

const HelpPlaceholderScreen = (props: Props) => {
    return(
        <View style={styles.screen}>
            <Text>Help placeholder</Text>
        </View>
    );
};

//options for header bar
HelpPlaceholderScreen.navigationOptions = {
    headerTitle: 'Help (Placeholder)',
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

export default HelpPlaceholderScreen;