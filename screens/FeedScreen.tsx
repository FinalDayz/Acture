import React from 'react';
import {View, StyleSheet, ScrollView, Button} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Container, Content, Icon, List, ListItem} from 'native-base';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import {Post} from "../components/Post";

const tempRes = require('../models/res');

export default class FeedScreen extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: false,
            data: tempRes.data
        }
    }


    render() {

        return(
            <Container>
                <Content>
                    <Button title='nieuw' onPress = {() => this.props.navigation.navigate('PostAddScreen')}/>
                    <List
                        dataArray={this.state.data}
                        renderRow={(item) => {
                            return <Post data={item}/>
                        }}
                    />
                </Content>
            </Container>
        );
    }

    //options for header bar. Default options are in the navigator.
    navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Feed',
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
        },
        postContainer: {
            alignSelf: 'center',
            marginVertical: 10,
            alignItems: 'center',
            width: '85%',
            minWidth: 200 //minimale breedte van een post
        }
    });
}
