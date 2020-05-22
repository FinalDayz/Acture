import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';

export interface Props {}

const EventsPlaceholderScreen = (props: Props) => {
    return(
        <View style={styles.screen}>
            <Text>Events placeholder</Text>
        </View>
    );
};

//options for header bar. Default options are in the navigator.
EventsPlaceholderScreen.navigationOptions = {
    headerTitle: 'Events (Placeholder)',
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title='profile' 
            iconName='md-person' //TODO: change to profile picture
            onPress={() => {
                console.log('Er is op de knop gedrukt'); //TODO: Change to navigate to profile
            }}/>
        </HeaderButtons>
    )
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