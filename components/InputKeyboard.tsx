import React from 'react';
import {Alert, Button, KeyboardTypeOptions, StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

export interface Props {
}

interface State {

}

export interface Props {
    type: KeyboardTypeOptions
}

export class InputKeyboard extends React.Component<Props, State> {

    constructor(props: Props, state: State) {
        super(props, state);
    }

    render () {
        return (
            <View style={styles.twoColumn}>
                <Text style={styles.halve}>{this.props.type}:</Text>
                <TextInput
                    style={[styles.input, styles.halve,]}
                    keyboardType={this.props.type}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    },
    halve: {
        flex: 1
    },
    twoColumn: {
        paddingTop: 5,
        width: '70%',
        flexDirection: 'row',
    },
});
