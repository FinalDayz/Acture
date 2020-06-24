import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import colors from '../../constants/colors';
import {AccountImage} from "../account/AccountImage";

export interface Props {
    profileImage: string
    startupImage: string
    userId: String
    category: String
    categoryId: String
    postDate: Date
    firstName: String
    LastName: String
    insertion: String //tussenvoegsel
    startupName: String
}

export class PostHeader extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    //Sets color for header bar based on post type variable
    setHeaderColor() {
        if(this.props.categoryId == '1') { return colors.postHeaderRed }
        if(this.props.categoryId == '2') { return colors.postHeaderBlue }
        if(this.props.categoryId == '3') { return colors.postHeaderYellow }
        if(this.props.categoryId == '4') { return colors.postHeaderGreen }
        if(this.props.categoryId == '5') { return colors.postHeaderPurple }
        if(this.props.categoryId == '6') { return colors.postHeaderOrange }
        if(this.props.categoryId == '7') { return colors.postHeaderPurple }
        else { return colors.postHeaderBlue }
    }

    //Sets color for the post type background in the header bar based on post type variable
    setHeaderTypeColor() {
        if(this.props.categoryId == '1') { return colors.postHeaderTypeRed }
        if(this.props.categoryId == '2') { return colors.postHeaderTypeBlue }
        if(this.props.categoryId == '3') { return colors.postHeaderTypeYellow }
        if(this.props.categoryId == '4') { return colors.postHeaderTypeGreen }
        if(this.props.categoryId == '5') { return colors.postHeaderTypePurple }
        if(this.props.categoryId == '6') { return colors.postHeaderTypeOrange }
        if(this.props.categoryId == '7') { return colors.postHeaderTypePurple }
        else { return colors.postHeaderTypeBlue }
    }

    makeName() {
        let name = "naam"
        if(this.props.insertion) {
            name = this.props.firstName + " " + this.props.insertion + " " + this.props.LastName
        }
        else {
            name = this.props.firstName + " " + this.props.LastName
        }
        return name
    }

    render() {
        return (
            <View style={this.styles.headerBackground}>
                <View style={this.styles.header}>
                    <View style={this.styles.horizontalFlex}>
                        <View>
                            { this.props.categoryId == '1' ? (
                                <AccountImage image={this.props.startupImage}/>
                                ) : (
                                <AccountImage image={this.props.profileImage}/>
                                )
                            }
                        </View>
                        <View style={this.styles.nameContainer}>
                            { this.props.categoryId == '1' ? (
                                <Text style={this.styles.name}>{this.props.startupName}</Text>
                                ) : (
                                <Text style={this.styles.name}>{this.makeName()}</Text>
                                )
                            }
                        </View>
                        <View style={this.styles.verticalFlex}>
                            <View style={this.styles.textContainer}>
                                <Text style={this.styles.postType} adjustsFontSizeToFit numberOfLines={2}>{this.props.category}</Text>
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
            justifyContent: 'center',
            marginRight: 5
        },
        nameContainer: {
            flex: 4,
            justifyContent: 'center'
        },
        name: {
            marginLeft: 10,
            color: colors.textLight,
            fontSize: 16,
        },
        postType: {
            paddingHorizontal: 15,
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
