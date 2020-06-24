import {PostModel} from "../models/PostModel";
import {User} from "../models/User";
import {StartupWithFollow} from "../models/StartupWithFollow";
import {ContactInfo} from "../models/ContactInfo";
import {Startup} from "../models/Startup";
import React from "react";
import {Dimensions, FlatList, Image, Linking, ScrollView, StyleSheet, Text, View} from "react-native";
import ApiDictionary from "../constants/ApiDictionary";
import {HttpHelper} from "../components/HttpHelper";
import bodyless from "../components/HttpClient";
import {ActivityIndicator} from "react-native-paper";
import colors from "../constants/colors";
import {Container, List} from "native-base";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {Post} from "../components/Post";
import {Hr} from "../components/Hr";
import {AccountRow} from "../components/account/AccountRow";

export interface Props {
    navigation: any,
}

interface State {
    isLoading: boolean,
    leden?: User[],
    currentStartup: Startup,
    startupPosts: undefined | any[]
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
            startupPosts: undefined,
            leden: undefined
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

        bodyless(HttpHelper.addUrlParameter(
            ApiDictionary.getStartupById, [this.state.startupId]
        )).then(result => {
            this.setState({
                leden: result.data
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
                    <ScrollView style={[styles.background, {height: '100%'}]}>
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
                        {this.tabGenerator(['Over', 'Contact', 'Leden'])}
                        {this.tabRouter()}
                        <Hr/>
                        {this.renderPosts()}
                    </ScrollView>
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
            case 'Leden':
                return this.renderLeden();
        }
    }

    renderLeden() {
        const members = [];
        if (this.state.leden)
            for (const member of this.state.leden) {
                members.push(
                    <View key={member.userId}>
                        <AccountRow account={member} isExpandable={false} navigation={this.props.navigation} navigable={true}/>
                    </View>
                );
                console.log("MEMBER");
            }

        return (
            <View style={styles.tabContent}>
                {members}
            </View>
        );
    }

    renderOver() {
        return (
            <View style={styles.tabContent}>
                <Text style={styles.companyDescription}>{this.state.currentStartup.description}</Text>
                {this.state.currentStartup.website ? (
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <View style={{flex: 1}}>
                            <Text style={styles.propertyKey}>Website: </Text>
                        </View>
                        <View style={{flex: 2}}>

                            <Text style={[styles.propertyValue, styles.link]}
                                  onPress={() => {
                                      // @ts-ignore
                                      Linking.openURL(Startup.toURL(this.state.currentStartup.website))
                                  }}>
                                {this.state.currentStartup.website}</Text>
                        </View>
                    </View>
                ) : null}
            </View>
        );
    }

    renderContact() {
        return (
            <View style={styles.tabContent}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <Text style={[styles.propertyKey]}>E-mail adres:</Text>
                        {this.state.currentStartup.telephone ? (
                            <Text style={[styles.propertyKey]}>Telefoon:</Text>
                        ) : null}
                    </View>
                    <View style={{flex: 3}}>
                        <Text style={[styles.propertyValue, styles.link]}
                              onPress={() => Linking.openURL('mailto:' + this.state.currentStartup.email)}>
                            {this.state.currentStartup.email}
                        </Text>
                        {this.state.currentStartup.telephone ? (
                            <Text style={[styles.propertyValue, styles.link]}
                                  onPress={() => Linking.openURL('https://wa.me/31' + this.state.currentStartup.telephone)}>
                                {"" + this.state.currentStartup.telephone}
                            </Text>
                        ) : null}
                    </View>
                </View>
            </View>
        );
    }

    renderPosts() {
        const posts = [];
        if (this.state.startupPosts)
            for (const post of this.state.startupPosts) {
                posts.push(
                    <View key={post.postId}>
                        <Post
                            data={post}
                            onEdit={() => {
                            }}
                            onDelete={() => {
                            }}
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
    propertyKey: {
        margin: 10,
        fontSize: 17,
        fontWeight: 'bold',
    },
    propertyValue: {
        margin: 10,
        fontSize: 17,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    background: {
        backgroundColor: colors.backgroundPrimary
    },
    companyDescription: {
        fontStyle: 'italic',
        fontSize: 15,
        margin: 10,
        color: colors.textPostContent,
        alignSelf: "auto",
        textAlignVertical: "center",
        textAlign: "center",
    },
    tabContent: {
        padding: 20,
    },
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
