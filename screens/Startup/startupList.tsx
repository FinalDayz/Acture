import React from "react";
import { Startup } from "../../models/Startup";
import { FlatList, View, Text, StyleSheet, Alert } from "react-native";
// @ts-ignore
import OptionsMenu from 'react-native-options-menu';
import {Ionicons} from '@expo/vector-icons';

export interface Props {
    navigation: any
}

export interface State {
    isLoading: boolean
    
    startups: Startup[]
}

export default class newStartupScreen extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,
            startups: props.navigation.data
        };
    }
    
    render() {
        return (
            <FlatList
                data={this.state.startups}    
                keyExtractor={(item, index) => item.startupId.toString()}
                renderItem={itemData =>
                    <View style={styles.startupItem}>
                        <Text>{itemData.item.name}</Text>
                        <OptionsMenu
                            customButton={(
                                <Ionicons
                                    name='md-more'
                                    size={27}
                                    color="black"
                                    style={this.styles.icon}
                                />
                            )}
                            destructiveIndex={1}
                            options={["Lid toevoegen", "Verlaten"]}
                            actions={[this., this.createConfirmAlert.bind(this)]}/>
                    </View>
                }
            />
        );
    }

    createConfirmAlert() {
        Alert.alert(
            'Klik op verlaten om te bevestigen.',
            '',
            [
                {
                    text: 'Annuleren',
                    style: "cancel"
                },
                {
                    text: 'Startup verlaten',
                    onPress: () => this.leaveStartup(),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    }
}

const styles = StyleSheet.create ({
    startupItem: {
        
    }
});
