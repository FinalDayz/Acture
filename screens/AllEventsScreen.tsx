import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Container, List} from 'native-base';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import { Post } from "../components/Post";
import {bodyfull} from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import { PostModel } from '../models/PostModel';

export default class AllEventsScreen extends React.Component<any, any> {

    state = {
        isLoading: false,
        data: [],
        offset: 0
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.getEvents()
    }
    
    getEvents() {
        if(!this.state.isLoading) {
            
            this.state.isLoading = true;
            bodyfull(ApiDictionary.getEvents, {})
            .then(
                (result: {data:Array<PostModel>}) => {
                    this.setState({data: result.data})
                })
                .catch ((error) => {
                        console.log(error);
                    })
        } else {
            return null
        }
    }

    render() {
        return(
            <Container style={this.styles.screen}>
                <View style={this.styles.scrollable}>
                    <List
                        dataArray={this.state.data}
                        renderRow={(item) => {
                            return <Post data={item}/>
                        }}
                    /> 
                </View>     
            </Container>
        );
    }

    //options for header bar. Default options are in the navigator.
    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Evenementen',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='profile'
                        iconName='md-person' //TODO: change to profile picture
                        onPress={() => {
                            navData.navigation.navigate('Profile');
                    }}/>
                </HeaderButtons>
            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='menu'
                        iconName='md-menu'
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        };
    };

    styles = StyleSheet.create ({
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.backgroundPrimary
        },
        scrollable: {
            flex: 1,
            width: '100%',
            height: '100%'
        }
    });
}
