import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import colors from '../../constants/colors';

export interface Props {
    postDate: String
}

export class PostHeader extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (    //gebruik om header kleur te veranderen: style={(setColor == true) ? styles.headerRed : styles.headerBlue}
            <View style={this.styles.headerBackground}>
                <View style={this.styles.headerBlue}>
                    <View style={this.styles.horizontalFlex}>
                        <View>
                            <View style={this.styles.profileImage}/>
                        </View>
                        <View style={this.styles.verticalFlex}>
                            <Text style={this.styles.name}>Lugus</Text>
                            <Text style={this.styles.topic}>Vakgebied</Text>
                        </View>
                        <View style={this.styles.verticalFlex}>
                            <View style={this.styles.textContainer}>
                                <Text style={this.styles.postType}>Nieuws</Text>
                            </View>
                            <Text style={this.styles.date}>{this.props.postDate}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    styles = StyleSheet.create ({
        headerBackground: { //the grey bottom corners of the header
            backgroundColor: colors.postBody,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
        },
        headerBlue: {
            height: 60,
            width: '100%',
            backgroundColor: colors.postHeaderBlue,
            padding: 10,
            borderRadius: 20
        },
        headerRed: {
            height: 60,
            width: '100%',
            backgroundColor: colors.postHeaderRed,
            padding: 10,
            borderRadius: 20
        },
        horizontalFlex: {
            flexDirection: 'row'
        },
        verticalFlex: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        profileImage: {
            backgroundColor: colors.backgroundPrimary,
            height: 36,
            width: 36,
            borderRadius: 18,
            margin: 'auto'
        },
        textContainer: {
            alignSelf: 'flex-end',
            backgroundColor: colors.postHeaderTypeBlue,
            borderRadius: 20,
            width: '70%',
            justifyContent: 'center',
            alignItems: 'flex-end'
        },
        name: {
            marginLeft: 10,
            color: colors.textLight,
            fontSize: 19
        },
        topic: {
            marginLeft: 10,
            color: '#212099',
            fontSize: 16,
        },
        postType: {
            paddingHorizontal: 10,
            marginRight: 10,
            fontSize: 16,
            fontStyle: 'italic',
            color: colors.textLight
        },
        date: {
            marginRight: 10,
            color: colors.textLight,
            textAlign: 'right',
            fontSize: 16
        }

    });

}
