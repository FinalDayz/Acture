import React from 'react';
import { View, StyleSheet } from 'react-native';

import {PostHeader} from './postComponents/PostHeader';
import {PostBody} from './postComponents/PostBody';
import {ListItem} from "native-base";

export interface Props {
    data: any
}

export class Post extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <ListItem>
                <View style={this.styles.postContainer}>
                    <PostHeader
                        postName={this.props.data.userId}
                        category={this.props.data.categoryId}
                        postDate={new Date(this.props.data.postDate)}/>
                    <PostBody
                        text={this.props.data.text}
                        title={this.props.data.title}
                        userId={this.props.data.userId}
                        postId={this.props.data.postId}/>
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




