import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import { accessibilityProps } from 'react-native-paper/lib/typescript/src/components/MaterialCommunityIcon';

export interface Props {}

const ExplorePlaceholderScreen = (props: Props) => {
    return(
        <View style={styles.screen}>
            <Text>Explore placeholder</Text>
        </View>
    );
};

//Options for header bar. Default options are in the navigator.
ExplorePlaceholderScreen.navigationOptions = {
    headerTitle: 'Explore (Placeholder)',
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title='profile' 
            iconName='md-person' //TODO: change to profile picture
            onPress={() => {
                //props.navigation.navigate('Profile'); //TODO: Change to navigate to profile
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

export default ExplorePlaceholderScreen;