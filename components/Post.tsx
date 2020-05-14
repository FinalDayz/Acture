import React from 'react';
import { View, StyleSheet } from 'react-native';

import PostHeader from './postComponents/PostHeader';
import PostBody from './postComponents/PostBody';

export interface Props {}

const Post = (props: Props) => {
    return (
        <View style={styles.postContainer}>
            <PostHeader/>
            <PostBody/>
        </View>
    );
};

const styles = StyleSheet.create ({
    postContainer: {
        flex: 1,
        margin: 10,
        width: '100%'
    }
});

export default Post;