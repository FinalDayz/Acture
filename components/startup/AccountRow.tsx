import React from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity} from "react-native";
import {Startup} from "../../models/Startup";
import colors from "../../constants/colors";

interface Props {
    account: Startup,
    isExpandable: boolean,
    navigable?: boolean,
    navigation?: any
}

interface State {
    account: Startup,
    isExpanded: boolean,
    navigable: boolean,
}

export class AccountRow extends React.Component<Props, State> {
    state: State;

    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            account: props.account,
            isExpanded: false,
            navigable: props.navigable === true,
        };

    }

    pressedAccount() {
        if (this.props.isExpandable)
            this.setState({
                isExpanded: !this.state.isExpanded
            });
        if(this.state.navigable) {
            this.props.navigation.navigate('Startup', {id: this.state.account.startupId})
        }
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={this.props.isExpandable || this.state.navigable ? 0.2 : 1}
                onPress={() => this.pressedAccount()}>
                <View style={[
                    styles.accountWrapper,
                    this.props.isExpandable ? styles.flexColumn : styles.flexRow
                ]}>
                    <View style={styles.flexRow}>
                        <View style={styles.profilePicture}>
                            <Image source={{uri: "data:image/png;base64," + this.state.account.image, scale: 1}}
                                   style={styles.profilePicture}/>
                        </View>
                        <View
                            style={[styles.profileInfo, styles.flexColumn]}>
                            <Text
                                style={styles.accountName}>
                                {/*TODO: make this use getFullName() once working with User objects*/}
                                {this.state.account.name}
                            </Text>
                            <Text
                                style={styles.accountEmail}>
                                {this.state.account.email}
                            </Text>
                        </View>
                        <View>
                            {!this.props.isExpandable ? this.props.children : null}
                        </View>
                    </View>

                    {this.props.isExpandable ? (
                        <View style={[styles.flexColumn,
                            this.state.isExpanded ? styles.userExpanded : styles.userNotExpanded,
                            {width: '95%'}
                        ]}>
                            {this.props.children}
                        </View>
                    ) : null}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    accountWrapper: {
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary,
        width: '100%',
        marginTop: 10,
        padding: 10,
        borderRadius: 50,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    profilePicture: {
        backgroundColor: '#999',
        borderRadius: 40,
        height: 40,
        width: 40,
    },
    profileInfo: {
        flex: 1,
        paddingRight: 10,
    },
    accountEmail: {
        color: colors.textGrey,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 12,
        flexWrap: "wrap",
    },
    accountName: {
        paddingLeft: 10,
        color: colors.textDark,
        fontWeight: 'bold',
        fontSize: 15,
    },
    userExpanded: {
        marginTop: 15,
    },
    userNotExpanded: {
        display: 'none',
        height: 0,
    },
});
