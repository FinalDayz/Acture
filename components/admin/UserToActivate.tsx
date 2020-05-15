import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {User} from "../../models/User";


export interface Props {
    user: User
}

interface State {
    user: User
}


export class UserToActivate extends React.Component<Props, State> {

    private user: User;

    constructor(props: Props, state: State) {
        super(props, state);

        this.user = props.user;
    }

    render() {
        return (
            <View>
                <Text>{ this.user.firstname + ' ' + this.user.lastname}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
