import React from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {InputKeyboard} from "./InputKeyboard";

export interface Props {
}

interface State {
    excitementLevel: number
}

export class CustomInput extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);

        this.state = {
            excitementLevel: 2
        }
    }

    getExclamationMarks = (numChars: number) =>
        Array(numChars + 1).join('!');

    private addExitement() {
        this.setState({
            excitementLevel: this.state.excitementLevel + 1
        });
    }

    private removeExitement() {
        if (this.state.excitementLevel <= 1) {
            Alert.alert("You cant have negative excitement >:(");
            return
        }
        this.setState({
            excitementLevel: this.state.excitementLevel - 1
        });
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={{flexDirection: 'column', paddingTop: 0}}>
                    <Text>
                        Hello there {this.getExclamationMarks(this.state.excitementLevel)}
                    </Text>
                    <Button
                        title={"Add exitement"}
                        onPress={() => this.addExitement()}/>
                    <Button
                        title={"Remove exitement"}
                        onPress={() => this.removeExitement()}/>
                </View>

                <Text style={styles.textInpts}>
                    DIFFERENT INPUTS
                </Text>

                <InputKeyboard type={'default'}/>
                <InputKeyboard
                    type={'default'}
                    minlength={4}
                    isRequired={false}
                />
                <InputKeyboard type={'email-address'}/>
                <InputKeyboard type={'number-pad'}/>
                <InputKeyboard type={'decimal-pad'}/>
                <InputKeyboard type={'numeric'}/>
                <InputKeyboard type={'phone-pad'}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInpts: {
        paddingTop: 30,
        fontSize: 20,
    },
    mainView: {
        width: '80%',
        flex: 0.7,
        justifyContent: 'center',
        alignContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
