import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../../constants/colors';

//export interface Props {}

export interface Props {
    title: String
    text: String
    eventDate: Date
    adress: String
    city: String
    price: String
}

export class EventBody extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }


    render() {
        return(
            <View style={this.styles.body}>
                <Text style={this.styles.title} >{this.props.title}</Text>
                <View style={this.styles.line}/>
                <View style={this.styles.details}>
                    <View style={this.styles.horizontal}>
                        <Text style={this.styles.detailItem}>{this.props.eventDate.toLocaleDateString()}</Text>
                        <Text style={this.styles.detailItem}>{this.props.eventDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1')}</Text>
                    </View>
                    <View style={this.styles.horizontal}>
                        <Text style={this.styles.detailItem}>{this.props.adress}</Text>
                        <Text style={this.styles.detailItem}>{this.props.city}</Text>
                    </View>
                    <Text style={this.styles.detailItem}>{this.props.price}</Text>
                </View>
                <View style={this.styles.line}/>
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
        line: {
            borderColor: colors.textPostContent,
            borderBottomWidth: 1,
            marginHorizontal: 15,
            marginVertical: 5
        },
        title: {
            marginHorizontal: 15,
            marginVertical: 10,
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.textPostTitle
        },
        details: {
            marginVertical: 2
        },
        horizontal: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start'
        },
        detailItem: {
            flex: 1,
            marginLeft: 15,
            fontSize: 13,
            color: colors.textPostContent
        },
        bodyText: {
            marginHorizontal: 15,
            fontSize: 15,
            color: colors.textPostContent
        }
    });
}
