import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';

import colors from '../../constants/colors';

import {User} from '../../models/User';
import {UserRole} from "../../models/UserRole";
import ApiDictionary from '../../constants/ApiDictionary';
import { bodyfull } from '../HttpClient';

import Image from 'react-native-scalable-image';

// @ts-ignore
import OptionsMenu from 'react-native-options-menu';
import {Ionicons} from '@expo/vector-icons';
import {shouldThrowAnErrorOutsideOfExpo} from "expo/build/environment/validatorState";


export interface Props {
    title: string
    text: string
    userId: string
    postId: string
    onDelete(): void
    onEdit(): void
    image: any

}

interface State{
    goodImage: boolean
    isLoading: boolean
}

export class PostBody extends React.Component<Props> {
        state: State;

    constructor(props: Props) {
        super(props);
        this.state={
            isLoading: false,
            goodImage: false
        }
      this.checkImageState()
    }

    checkImageState(){
        if (this.props.image != null && this.props.image!= undefined){
            this.state.goodImage = true
        }else{this.state.goodImage = false}
    }


    
    editPost() {
        this.props.onEdit();
    }

    deletePost() {
        this.props.onDelete();
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
                        options={["Bewerken", "Verwijderen"]}
                        actions={[this.editPost.bind(this), this.createConfirmAlert.bind(this)]}/>
                    }
                </View>
                <Text style={this.styles.bodyText} >{this.props.text}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center',marginTop:5}}>
                    {this.state.goodImage ? (
                        <Image
                            source={{uri: "data:image/png;base64," + this.props.image}}
                            resizeMode='contain'
                            style={this.styles.imageStyles}
                        />
                    ) : null }
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
        // postImage:{
        //     width: 50,
        //     height: 50
        // },
        imageStyles:{
            maxHeight: 350,
            maxWidth: 350,
            flex: 1,
            resizeMode: 'cover'
        },
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
