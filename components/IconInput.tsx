import React from "react";
import {StyleProp, StyleSheet, TextInput, TextStyle, View, ViewStyle} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import colors from "../constants/colors";

interface Props {
    iconName: string,
    inputPlaceholder: string,
    onChangeText: (text: string) => void,
    wrapperStyle?: StyleProp<ViewStyle>,
    textInputStyle?: StyleProp<TextStyle>,
}

interface State {
    inputText: string,
}

export class IconInput extends React.Component<Props, State> {
    state: State;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            ...state,
            inputText: '',
        }
    }

    changeText(text: string) {
        this.setState({
            inputText: text
        }, () => {
            this.props.onChangeText(this.state.inputText)
        });
    }

    render() {
        return (
            <View style={[{
                flexDirection: 'row',
                borderRadius: 5,
                paddingLeft: 10,
                alignItems: 'center',
                backgroundColor: 'lightgrey',
            },
                this.props.wrapperStyle
            ]}>
                <Ionicons name={this.props.iconName} size={27}/>
                <TextInput
                    onChangeText={this.changeText.bind(this)}
                    style={[{
                        padding: 10,
                        paddingLeft: 10,
                        flex: 1,
                        color: colors.textDark,
                    },
                        this.props.textInputStyle
                    ]}
                    placeholder={this.props.inputPlaceholder}
                    placeholderTextColor={colors.textGrey}>

                </TextInput>
            </View>
        );
    }

}

const styles = StyleSheet.create({});
