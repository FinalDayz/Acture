import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';
import {bodyfull} from "../components/HttpClient";
import ApiDictionary from "../constants/ApiDictionary";
import {PostModel} from "../models/PostModel";
import {List} from "native-base";
import {Post} from "../components/Post";

export interface Props {
    userId: number
}

export interface State {
    isLoading: boolean,
    blogs: PostModel[]
}

export default class ProfileScreen extends React.Component<Props, State> {
    state: State;

    constructor (props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,
            blogs: []
        }
    }

    componentDidMount() {
        this.getBlogs()
    }

    render() {
        return(
            <View>
                {/* TODO: Tab-specific content on top*/}

                {/*separator:*/}
                <View style={this.styles.separator} />

                <List
                    dataArray={this.state.blogs}
                    renderRow={(item) => {
                        return <Post
                                    data={item}
                                    onDelete={this.handleDelete.bind(this)}/>
                    }}
                />
            </View>
        );
    }

    //options for header bar. Default options are in the navigator.
    navigationOptions = {
        headerTitle: 'Profiel'
    };

    getBlogs = () => {
        if (!this.state.isLoading) {
            this.setState({isLoading:true}, ()=> {
            bodyfull(ApiDictionary.getUserBlogs, {
                userId: 1 // TODO: meegeven bij navigatie
            })
                .then(
                    (result) => {
                    this.setState({
                        isLoading: false,
                        blogs: result.data})
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({isLoading: false})
                })
            });

        }
    };

    handleDelete(postId: string) {
        const newData = this.state.blogs.filter(
            (post) => post.postId.toString() != postId
        );

        this.setState({
            blogs: newData
        })
    };

    styles = StyleSheet.create ({
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            backgroundColor: colors.backgroundPrimary
        },
        separator: {
            borderBottomColor: '#747474',
            borderBottomWidth: 1,
            marginHorizontal: 15,
            marginVertical: 15
        }
    });
}
