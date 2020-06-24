import React from "react";
import { Startup } from "../../models/Startup";
import { FlatList, View, Text, StyleSheet, Alert } from "react-native";
// @ts-ignore
import OptionsMenu from 'react-native-options-menu';
import {Ionicons} from '@expo/vector-icons';
import { bodyfull } from "../../components/HttpClient";
import ApiDictionary from "../../constants/ApiDictionary";

export interface Props {
    navigation: any
}

export interface State {
    isLoading: boolean
    
    startups: Startup[]
}

export default class StartupList extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,
            startups: props.navigation.state.params.startups,
        };
    }

    deleteStartup(id: number) {
        const newData = this.state.startups.filter(
            (startup) => startup.startupId != id
        );

        this.setState({
            startups: newData
        }, () => {
            Alert.alert(
                'Succes!',
                'U hebt de startup succesvol verlaten',
                [{text: 'OK', onPress: () => this.props.navigation.pop()}],
            )
        })
    }

    leaveStartup(id: number) {
        if (!this.state.isLoading) {
            this.setState({isLoading: true}, () => {
                bodyfull(ApiDictionary.leaveStartup,{startupId: id}
                ).then((result) => {
                        if (result.success === 1) {
                            this.setState({isLoading: false}, () => {
                                this.deleteStartup(id)
                            })
                        }
                        else {
                            this.failMessage()
                        }
                    }
                ).catch(err => {
                    console.log(err)
                    this.setState({isLoading:false}, () => {
                        this.failMessage()

                    })
                });
            })
        }
    }


    failMessage() {
        Alert.alert(
            'Er is een fout opgetreden',
            'Probeer het later opnieuw...',
            [{text: 'OK'}])
    }
    
    render() {
        return (
            <FlatList
                data={this.state.startups}    
                keyExtractor={(item, index) => item.startupId.toString()}
                renderItem={itemData =>
                    <View style={styles.startupItem}>
                        <Text style={{flex: 16}}>{itemData.item.name}</Text>
                        <OptionsMenu
                            customButton={(
                                <Ionicons
                                    name='md-more'
                                    size={27}
                                    color="black"
                                    style={styles.icon}
                                />
                            )}
                            destructiveIndex={1}
                            options={["Verlaten"]}
                            actions={[this.createConfirmAlert.bind(this, itemData.item.startupId, itemData.item.name)]}/>
                    </View>
                }
            />
        );
    }

    createConfirmAlert(startupId: number, name: string) {
        Alert.alert(
            'Klik op verlaten om te bevestigen.',
            'Startup: ' + name,
            [
                {
                    text: 'Annuleren',
                    style: "cancel"
                },
                {
                    text: 'Startup verlaten',
                    onPress: () => this.leaveStartup(startupId),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    }
}

const styles = StyleSheet.create ({
    startupItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    icon: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 15
    },
});
