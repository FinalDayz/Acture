import React from "react";
import {StyleSheet, View} from "react-native";
import colors from "../constants/colors";

export interface Props {

}

export interface State {

}

export default class userPrivacyScreen extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);

    }

    render() {
        return (
            <View style={styles.wrapper}>

            </View>
        );
    };

}

const styles = StyleSheet.create ({
    wrapper: {
        margin: 15,
    }
});
