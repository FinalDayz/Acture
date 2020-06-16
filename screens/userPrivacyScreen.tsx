import React from "react";
import {StyleSheet, View} from "react-native";
import colors from "../constants/colors";
import {CheckBox} from "react-native-elements";

export interface Props {

}

export interface State {
    checked: boolean,
}

export default class userPrivacyScreen extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state
        };
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <CheckBox
                    center
                    title='Click Here'
                    checked={this.state.checked}
                    onPress={() => this.setState({checked: !this.state.checked})}
                />
            </View>
        );
    };

}

const styles = StyleSheet.create ({
    wrapper: {
        margin: 15,
    }
});
