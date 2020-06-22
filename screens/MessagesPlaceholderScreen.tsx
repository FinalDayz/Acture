import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import { User } from '../models/User';

export interface Props {}

const MessagesPlaceholderScreen = (props: Props) => {
    return(
        <View style={styles.screen}>
            <Text>Messages placeholder</Text>
        </View>
    );
};

//options for header bar. Default options are in the navigator.
MessagesPlaceholderScreen.navigationOptions = (navData:any) => {
    return {
        headerTitle: 'Messages (Placeholder)',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                title='profile' 
                iconName='md-person' //TODO: change to profile picture
                onPress={() => {
                    navData.navigation.navigate('Profile', {id: User.getLoggedInUser().userId})
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

export default MessagesPlaceholderScreen;