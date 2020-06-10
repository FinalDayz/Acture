import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';

import colors from '../../constants/colors';

import {User} from '../../models/User';
import {UserRole} from "../../models/UserRole";
import ApiDictionary from '../../constants/ApiDictionary';
import { bodyfull } from '../HttpClient';

import {Ionicons} from '@expo/vector-icons';
import {shouldThrowAnErrorOutsideOfExpo} from "expo/build/environment/validatorState";


export interface Props {
    title: String
    text: String
    userId: String
    postId: String
}

export class PostBody extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    state = {
        isLoading: false
    };

    render() {
        return(
            <View style={this.styles.body}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={this.styles.title} >{this.props.title}</Text>
                    { (User.getRole() === UserRole.admin || User.getUserId().toString() == this.props.userId) &&
                        <Ionicons
                            name='md-more'
                            size={27}
                            color="black"
                            style={this.styles.icon}
                            onPress={() => {this.createConfirmAlert()}}/>
                    }
                </View>
                <Text style={this.styles.bodyText} >{this.props.text}</Text>
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
                },
                {
                    text: 'Verwijderen',
                    onPress: () => this.deletePost()
                }
            ],
            { cancelable: true }
        );
    }

    deletePost() {
        if(!this.state.isLoading) {
            this.setState({isLoading:true});
            bodyfull(ApiDictionary.deletePost, {
                postId: this.props.postId
            }).then((data) => {
                alert("Verwijderen succesvol");
                this.render();
                this.setState({isLoading:false})
            }).catch(err => {
                console.log("fetch error" + err.message);
                alert(err.message);
                this.setState({isLoading:false})
            })
        }
    };

    alertStyles = StyleSheet.create({
        cancel: {

        }
    });

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
            flex: 16,
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.textPostTitle
        },
        icon: {
            flex: 1,
            marginVertical: 8,
            marginHorizontal: 15
        },
        bodyText: {
            marginHorizontal: 15,
            fontSize: 15,
            color: colors.textPostContent
        }
    });
}
