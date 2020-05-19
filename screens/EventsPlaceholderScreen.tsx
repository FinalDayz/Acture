import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

export interface Props {}

const EventsPlaceholderScreen = (props: Props) => {
    return(
        <View style={styles.screen}>
            <Text>Events placeholder</Text>
        </View>
    );
};

//options for header bar
EventsPlaceholderScreen.navigationOptions = {
    headerTitle: 'Events (Placeholder)',
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

export default EventsPlaceholderScreen;