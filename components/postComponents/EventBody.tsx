import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';


import {bodyfull} from '../../components/HttpClient';
import ApiDictionary from '../../constants/ApiDictionary';

import colors from '../../constants/colors';
import { User } from '../../models/User';
import { UserRole } from '../../models/UserRole';

// @ts-ignore
import OptionsMenu from 'react-native-options-menu';
import {Ionicons} from '@expo/vector-icons';

export interface Props {
    title: string
    text: string
    userId: string
    eventDate: Date
    adress: string
    city: string
    price: string
    attendance: number
    evenementId: number
    doesAttend: number
    postId: string
    onDelete(): void
    onEdit(): void
}

export class EventBody extends React.Component<Props> {

    state = {
        isLoading: false,
        attendButtonPressed: false,
        attendance: this.props.attendance
    };

    editPost() {
        this.props.onEdit();
    }
    
    deletePost() {
        this.props.onDelete()
    }

    addUserToEvent() {
        if(!this.state.isLoading) {
            this.state.attendButtonPressed = true;
            this.state.isLoading = true;
            bodyfull(ApiDictionary.insertAttendant, {
                eventId: this.props.evenementId
            }).then(response => {
                this.setState({attendance: this.state.attendance + 1})
            })
            .catch ((error) => {
                    console.log("Dit is de error joehoeeee: " + error);
            })
            this.setState({isLoading : false});
        }
    }

    removeUserFromEvent() {
        //http request
    }

    render() {
        return(
            <View style={this.styles.body}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={this.styles.title} >{this.props.title}</Text>
                    { (User.getRole() === UserRole.admin || User.getUserId().toString() == this.props.userId) &&
                    <OptionsMenu
                        customButton={(
                            <Ionicons
                                name='md-more'
                                size={27}
                                color="black"
                                style={this.styles.icon}
                            />
                        )}
                        destructiveIndex={1}
                        options={["Bewerken", "Verwijderen", "Cancel"]}
                        actions={[this.editPost.bind(this), this.createConfirmAlert.bind(this)]}/>
                    }
                </View>
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
                    <Text style={this.styles.detailItem}>Toegang: {this.props.price}</Text>
                </View>
                <View style={this.styles.line}/>
                <Text style={this.styles.bodyText}>{this.props.text}</Text>
                <View style={this.styles.bottomContent}>
                    <View style={this.styles.attendanceContainer}>
                        <Text style={this.styles.attendance}>totaal aanmeldingen {this.state.attendance}</Text>
                    </View>

                    { (this.props.doesAttend == 0 && !this.state.attendButtonPressed) &&
                        <TouchableOpacity style={this.styles.attendButton} onPress={() => {this.addUserToEvent()}}>
                            <Text style={this.styles.attendButtonText}>Aanmelden</Text>
                        </TouchableOpacity>
                    }
                    { (this.props.doesAttend == 1 || this.state.attendButtonPressed) &&
                        <Text style={this.styles.doesAttend}>Je bent aangemeld</Text>
                    }
                </View>    
            </View>
        );
    }

    createConfirmAlert() {
        Alert.alert(
            'Klik op verwijderen om te bevestigen.',
            '',
            [
                {
                    text: 'Annuleren',
                    style: "cancel"
                },
                {
                    text: 'Verwijderen',
                    onPress: () => this.deletePost(),
                    style: "destructive"
                }
            ],
            { cancelable: true }
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
            flex: 16,
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
        },
        bottomContent: {
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start'
        },
        attendButton: {
            flex: 1,
            backgroundColor: colors.postHeaderGreen,
            borderRadius: 20,
            alignItems: 'center',
            paddingHorizontal: 0,
            paddingVertical: 3,
            marginRight: 15          
        },
        attendButtonText: {
            color: colors.textLight,
            fontSize: 16
        },
        attendanceContainer: {
            flex: 1,
            marginLeft: 15,
            marginTop: 2
        },
        attendance: {
            fontSize: 15,
            fontStyle: 'italic',
            color: colors.textPostContent,
        },
        doesAttend: {
            flex: 1,
            marginRight: 15,
            marginTop: 2,
            fontSize: 15,
            color: colors.textPostContent
        },
        icon: {
            flex: 1,
            marginVertical: 8,
            marginHorizontal: 15
        }
    });
}
