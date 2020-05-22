import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';

export interface Props {}

const HelpPlaceholderScreen = (props: Props) => {
    return(
        <View style={styles.screen}>
            <Text>Help placeholder</Text>
        </View>
    );
};

//options for header bar. Default options are in the navigator.
HelpPlaceholderScreen.navigationOptions = (navData:any) => {
    return {
        headerTitle: 'Help (Placeholder)',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                title='profile' 
                iconName='md-person' //TODO: change to profile picture
                onPress={() => {
                    navData.navigation.navigate('Profile');
                }}/>
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='menu'
                    iconName='md-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} 
                />
            </HeaderButtons>
        )
    }
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