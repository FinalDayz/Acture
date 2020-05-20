import React from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Input} from "./input/standardInput";

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

                <Input type={'default'} isRequired={true}/>
                <Input type={'email-address'}/>
                <Input type={'number-pad'}/>
                <Input type={'decimal-pad'}/>
                <Input type={'numeric'}/>
                <Input type={'phone-pad'}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
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
