import {PostModel} from "../models/PostModel";
import {User} from "../models/User";
import {StartupWithFollow} from "../models/StartupWithFollow";
import {ContactInfo} from "../models/ContactInfo";
import {Startup} from "../models/Startup";
import React from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import ApiDictionary from "../constants/ApiDictionary";
import {HttpHelper} from "../components/HttpHelper";
import bodyless from "../components/HttpClient";
import {ActivityIndicator} from "react-native-paper";
import colors from "../constants/colors";
import {Container, List} from "native-base";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {Post} from "../components/Post";

export interface Props {
    navigation: any,
}

interface State {
    isLoading: boolean,
    blogs: PostModel[],
    currentStartup: Startup,
    startupPosts: undefined|PostModel[]
    startupId: number,
    selectedTab: string,
    isOwnStartup: boolean,
}

export default class ProfileScreen extends React.Component<Props, State> {
    _isMounted: boolean;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            isLoading: false,
            selectedTab: 'Over',
            isOwnStartup: false,
            startupId: this.props.navigation.state.params.id,
            startupPosts: undefined
        };

        this._isMounted = false;
    }


    componentDidMount(): void {
        this.fetchInfo();
        this._isMounted = true;
    }

    fetchInfo() {
        if (this.state.isLoading) {
            return;
        }
        this.setState({
            isLoading: true
        });

        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.getStartupByStartupId, [this.state.startupId]
        )).then(result => {
            this.setState({
                currentStartup: result.data[0],
                isLoading: false
            });
        });

        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.getStartupsPosts, [this.state.startupId]
        )).then(result => {
            this.setState({
                startupPosts: result.data
            });
        });
    }

    render() {

        return (
            <View>
                {this.state.isLoading || !this._isMounted ? (
                    <View style={styles.screen}>
                        <ActivityIndicator size="large" color={colors.textLight}/>
                    </View>
                ) : (
                    <View>
                        <View style={styles.top}>
                            <Image source={{uri: "data:image/png;base64," + this.state.currentStartup.image, scale: 1}}
                                   style={styles.startupImage}/>

                            <Image source={{uri: "data:image/png;base64," + this.state.currentStartup.image, scale: 1}}>

                            </Image>
                            <View style={styles.startupTextWrapper}>
                                <Text style={[styles.text, styles.startupName]} adjustsFontSizeToFit
                                      numberOfLines={3}>{this.state.currentStartup.name}</Text>
                            </View>
                        </View>
                        {this.tabGenerator(['Over', 'Contact'])}
                        {this.tabRouter()}
                        {this.renderPosts()}
                    </View>
                )
                }
            </View>
        );
    }
    tabRouter() {
        switch (this.state.selectedTab) {
            case 'Over':
                return this.renderOver();
            case 'Contact':
                return this.renderContact();
        }
    }

    renderOver() {
        return (
            <View>
                <Text>About</Text>
            </View>
        );
    }

    renderContact() {
        return (
            <View>
                <Text>Contact</Text>
            </View>
        );
    }

    renderPosts() {
        const posts = [];
        if(this.state.startupPosts)
            for(const post of this.state.startupPosts) {
                posts.push(
                    <View>
                        <Post
                            key={post.postId}
                            data={post}
                            onEdit={() => {}}
                            onDelete={() => {}}
                            handlePress={() => {
                            }}
                            navigation={this.props.navigation}/>
                    </View>
                )
            }
        return (
            <List>
                {posts}
            </List>
        );
    }

    tabGenerator(category: string[]) {
        let categoryWidth = ((1 / category.length) * 100).toString() + '%'
        let categoryList = category.map((name) => {
                return (
                    <View style={[styles.category, {width: categoryWidth, backgroundColor: this.IstabSelected(name)}]}
                          key={name}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.setState({selectedTab: name})
                        }}>
                            <Text style={styles.tabText} adjustsFontSizeToFit>{name}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                )
            }
        );

        return (
            <View style={{width: '100%', height: 50, flexDirection: 'row', backgroundColor: '#e3e8eb'}}>
                {categoryList}
            </View>
        )
    }

    IstabSelected(name: string) {
        return name === this.state.selectedTab ? 'white' : colors.backgroundSecondary;
    }

}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    tabText: {
        fontSize: 17,
        margin: 10,
        color: colors.textPostContent,
        alignSelf: "auto",
        textAlignVertical: "center",
        textAlign: "center",
    },
    category: {
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    text: {
        color: colors.textPostContent,
    },
    startupTextWrapper: {
        flex: 1,
        height: width / 2.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundSecondary,
        paddingBottom: 20,
    },
    startupName: {
        fontSize: 25,
    },
    startupImage: {
        height: width / 2.5,
        width: width / 2.5,
        borderWidth: 5,
        borderRadius: width / 5,
        marginLeft: 10, marginTop: 30,
        backgroundColor: "white",
        borderColor: 'white',
    },
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
