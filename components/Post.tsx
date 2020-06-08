import React from 'react';
import { View, StyleSheet } from 'react-native';
import {ListItem} from "native-base";

import {PostHeader} from './postComponents/PostHeader';
import {PostBody} from './postComponents/PostBody';
import {EventBody} from './postComponents/EventBody';


export interface Props {
    data: any
}

export class Post extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        if (this.props.data.categoryId === 4) {
            return (
                <ListItem style={this.styles.listContainer}>
                    <View style={this.styles.postContainer}>
                        <PostHeader
                            postName={this.props.data.userId}
                            category={this.props.data.categoryId}
                            postDate={new Date(this.props.data.postDate)}/>
                        <EventBody
                            text={this.props.data.text}
                            title={this.props.data.title}
                            eventDate={new Date(this.props.data.date)}/>
                    </View>
                </ListItem>
            );
        }
        else {
            return (
                <ListItem style={this.styles.listContainer}>
                    <View style={this.styles.postContainer}>
                        <PostHeader
                            postName={this.props.data.userId}
                            category={this.props.data.categoryId}
                            postDate={new Date(this.props.data.postDate)}/>
                        <PostBody
                            text={this.props.data.text}
                            title={this.props.data.title}/>
                    </View>
                </ListItem>
            );
        }
        
    };

    styles = StyleSheet.create ({
        listContainer: {
            borderBottomWidth: 0, //important: removes auto-generated border
            alignSelf: 'center',
            alignItems: 'center',
            width: '95%',
            minWidth: 200
            
        },
        postContainer: {
            flex: 1,
            margin: 10,
            width: '100%'
        }
    });
}




