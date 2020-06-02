import React from 'react';
import { View, StyleSheet } from 'react-native';

import PostHeader from './postComponents/PostHeader';
import PostBody from './postComponents/PostBody';
import {ListItem} from "native-base";

export interface Props {
    data: any
}

export class Post extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <ListItem>
                <View style={this.styles.postContainer}>
                    <PostHeader/>
                    <PostBody/>
                </View>
            </ListItem>
        );
    };

    styles = StyleSheet.create ({
        postContainer: {
            flex: 1,
            margin: 10,
            width: '100%'
        }
    });
}




