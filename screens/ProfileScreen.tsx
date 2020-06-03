import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

export interface Props {}

const ProfileScreen = (props: Props) => {
    return(
        <View style={styles.screen}>
            <Text>Profiel placeholder</Text>
        </View>
    );
};

//options for header bar. Default options are in the navigator.
ProfileScreen.navigationOptions = {
    headerTitle: 'Profiel'
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

export default ProfileScreen;