import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';
import bodyless from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";

export default class ProfileScreen extends React.Component<any, any> {

    constructor (props: any) {
        super(props);

        this.state = {
            isLoading: false,
            blogs: {}
        }
    }

    render() {
        return(
            <View style={this.styles.screen}>
                <Text>Profiel placeholder</Text>
            </View>
        );
    }

    //options for header bar. Default options are in the navigator.
    navigationOptions = {
        headerTitle: 'Profiel'
    };

    getBlogs = () => {
        if (!this.state.isLoading) {
            this.setState({isLoading:true});
            bodyless(ApiDictionary.getUserBlogs)
                // .then((data))
        }
    }

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
