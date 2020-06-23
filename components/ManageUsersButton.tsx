import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'

import colors from '../constants/colors';

export interface Props {
    onPress: () => void;
}

export class ManageUsersButton extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return(
            <View style={this.styles.container}>
                <TouchableOpacity style={this.styles.button} onPress={this.props.onPress}>
                    
                    <Text style={this.styles.text}><Ionicons name='md-person' size={19} color={colors.textLight}/>    Beheren</Text>
                </TouchableOpacity>
            </View>
        )
    }

    styles = StyleSheet.create ({
        container: {
            width: '100%'
        },
        button: {
            backgroundColor: colors.primaryLight,
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginVertical: 1,
            marginHorizontal: 15,
            borderRadius: 5,
            maxWidth: 150,
            minWidth: 135,
        },
        text: {
            color: colors.textLight,
            fontSize: 16,
            fontWeight: "bold"
        }
    });
}