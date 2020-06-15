import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import {bodyfull} from '../components/HttpClient';
import ApiDictionary from '../constants/ApiDictionary';
import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import {PostModel} from '../models/PostModel';

export default class HelpScreen extends React.Component<any, any> {

    state = {
        isLoading: false,
        data: [],
        offset: 0
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.getGuides()
    }

    getGuides() {
        if(!this.state.isLoading) {
            
            this.state.isLoading = true;
            bodyfull(ApiDictionary.getFeed, {
                offs: this.state.offset //offset for loading more posts
            })
            .then(
                (result: {data:Array<PostModel>}) => {
                    this.setState({data: result.data})
                })
            .catch ((error) => {
                console.log(error);
            })
            this.setState({isLoading : false});
        }
    }

    render() {
        return(
            <View style={this.styles.screen}>
                <Text>Help placeholder</Text>
            </View>
        );
    }


    //options for header bar. Default options are in the navigator.
    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Guides',
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
        }
    };

    styles = StyleSheet.create ({
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            backgroundColor: colors.backgroundPrimary
        }
    });
}    
