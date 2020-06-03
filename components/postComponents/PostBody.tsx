import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../../constants/colors';

export interface Props {}

export interface Props {
    title: String
    text: String
}

export class PostBody extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }


    render() {
        return(
            <View style={this.styles.body}>
                <Text style={this.styles.title} >{this.props.title}</Text>
                <Text style={this.styles.bodyText} >{this.props.text}</Text>
            </View>
        );
    }

    styles = StyleSheet.create ({
        body: {
            flex: 1,
            backgroundColor: colors.postBody,
            width: '100%',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 30
        },
        title: {
            marginHorizontal: 15,
            marginVertical: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.textPostTitle
        },
        bodyText: {
            marginHorizontal: 15,
            fontSize: 15,
            color: colors.textPostContent
        }
    });
}
