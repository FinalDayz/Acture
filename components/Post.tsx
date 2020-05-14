import React from 'react';
import { View, StyleSheet } from 'react-native';



export interface Props {}

const Post = (props: Props) => {
    return (
        <View style={styles.postContainer}>

        </View>
    );
};

const styles = StyleSheet.create ({
    postContainer: {
        flex: 1
    }
})