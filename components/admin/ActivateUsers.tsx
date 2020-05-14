import React from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import { User } from '../../models/User';
import {blabla} from "./UserToActivate";

export interface Props {
}

interface State {
    accounts: User[]
}


export class ActivateUsers extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);

        let dummyUser = new User();
        dummyUser.activivated = false;
        dummyUser.email = 'henk@gmail.com';
        dummyUser.role = 'USER';
        dummyUser.firstname= 'Henk';
        dummyUser.lastname = 'Appelboom';

        this.setState({
            accounts: [
                dummyUser
            ]
        });
    }


    render() {
        return (
            <View>
                {this.state.accounts.map((account, index) => {
                    return (
                        <blabla user={account}/>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
