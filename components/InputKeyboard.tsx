import React from 'react';
import {Alert, Button, KeyboardTypeOptions, StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';


export interface Props {
    isRequired?: boolean,
    isValid?: boolean,
    type: KeyboardTypeOptions
}

interface State {
    isValid: boolean,
    text: string,
    isRequired: boolean,
    error: string,
}

export class InputKeyboard extends React.Component<Props, State> {
    state: State;


    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            ...state,
            isRequired: props.isRequired == undefined ? true : props.isRequired,
            text: '',
        };


        if (props.isValid !== undefined) {
            this.setState({
                isValid: props.isValid
            });
        }
    }

    changeHandler(text: string) {
        this.setState({text: text}, () => {
            this.finishText();
        });

    }

    finishText() {
        console.log(this.isValid());
        var isValid = this.isValid();
        if(!isValid) {
            this.setState({
                error: 'Please enter a valid value'
            });
        }
        this.setState({
            isValid: isValid
        });
    }

    isValid(): boolean {
        let isValidHelper = true;
        let inputText = this.state.text;
        console.log(inputText);
        if (this.state.isRequired) {
            isValidHelper = !(this.state.text.trim() === '');
            switch (this.props.type) {
                case 'email-address':
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    isValidHelper = re.test(String(inputText).toLowerCase());
                    break;
                case 'number-pad':
                    isValidHelper = +inputText == Math.round(+inputText);
                    break;
                case 'decimal-pad':
                case 'numeric':
                    isValidHelper = !isNaN(Number(inputText));
                    break;
            }
        }

        return isValidHelper;
    }

    render() {
        return (
            <View style={styles.twoColumn}>
                <Text style={styles.halve}>{this.props.type}:</Text>
                <View style={styles.halve}>
                    <TextInput
                        {...this.props}
                        style={[styles.input]}
                        onChangeText={text => this.changeHandler(text)}
                        value={ this.state.text }
                        onBlur={() => this.finishText}
                        keyboardType={this.props.type}/>

                    <Text style={styles.error}>
                        { this.state.isValid ? '' : this.state.error }
                    </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    error: {
      color: 'red',
      fontSize: 12,
    },
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
