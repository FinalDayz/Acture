import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';

export interface Props {}

const MenuScreen = (props: Props) => {
    return(
        <View style={styles.screen}>
            <Text style={{color: colors.textLight}}>Menu placeholder</Text>
        </View>
    );
};

const styles = StyleSheet.create ({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        backgroundColor: colors.primary
    }
});

export default MenuScreen;