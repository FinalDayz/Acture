import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import colors from '../../constants/colors';

export interface Props {
    postName: String
    category: String
    postDate: Date
}

export class PostHeader extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    //Sets color for header bar based on post type variable
    setHeaderColor() {
        if(this.props.category == '1') { return colors.postHeaderRed }
        if(this.props.category == '2') { return colors.postHeaderBlue }
        if(this.props.category == '3') { return colors.postHeaderYellow }
        if(this.props.category == '4') { return colors.postHeaderGreen }
        if(this.props.category == '5') { return colors.postHeaderPurple }
        if(this.props.category == '6') { return colors.postHeaderOrange }
        if(this.props.category == '7') { return colors.postHeaderPurple }
        else { return colors.postHeaderTypeBlue }
    }

    //Sets color for the post type background in the header bar based on post type variable
    setHeaderTypeColor() {
        if(this.props.category == '1') { return colors.postHeaderTypeRed }
        if(this.props.category == '2') { return colors.postHeaderTypeBlue }
        if(this.props.category == '3') { return colors.postHeaderTypeYellow }
        if(this.props.category == '4') { return colors.postHeaderTypeGreen }
        if(this.props.category == '5') { return colors.postHeaderTypePurple }
        if(this.props.category == '6') { return colors.postHeaderTypeOrange }
        if(this.props.category == '7') { return colors.postHeaderTypePurple }
        else { return colors.postHeaderTypeBlue }
    }

    render() {
        return (   
            <View style={this.styles.headerBackground}>
                <View style={this.styles.header}>
                    <View style={this.styles.horizontalFlex}>
                        <View>
                            <View style={this.styles.profileImage}/>
                        </View>
                        <View style={this.styles.verticalFlex}>
                            <Text style={this.styles.name}>{this.props.postName}</Text>
                            <Text style={this.styles.topic}>Vakgebied</Text>
                        </View>
                        <View style={this.styles.verticalFlex}>
                            <View style={this.styles.textContainer}>
                                <Text style={this.styles.postType}>{this.props.category}</Text>
                            </View>
                            <Text style={this.styles.date}>{this.props.postDate.toLocaleDateString()}</Text>
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
        header: {
            height: 60,
            width: '100%',
            backgroundColor: this.setHeaderColor(),
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
            backgroundColor: this.setHeaderTypeColor(),
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
            color: colors.textLight,
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
