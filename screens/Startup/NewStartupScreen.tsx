import React from "react";
import {StyleSheet, View, Text, TextInput, Alert, Button} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import bodyless, { bodyfull } from "../../components/HttpClient";
import ApiDictionary from "../../constants/ApiDictionary";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";


export interface Props {
    navigation: any
}

export interface State {
    isLoading: boolean

    startupName: string
    startupDescription: string
    startupPhone: string
    startupMail: string
    startupSite: string
    startupImage: string
    imageName: string

    startupNameValid: boolean
    startupDescriptionValid: boolean
    isValid: boolean
}

export default class NewStartupScreen extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            isLoading: false,

            startupName: '',
            startupDescription: '',
            startupPhone: '',
            startupMail: '',
            startupSite: '',
            startupImage: '',
            imageName: '',

            startupNameValid: true,
            startupDescriptionValid: true,

            isValid: false,

        };
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        // @ts-ignore
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                base64: true,
                aspect: [4, 3],
                quality: 0.01,
            });
            if (result && !result.cancelled) {
                console.log(result.uri);
                const base64 = result.base64;
                if(base64 && base64.length <= 20000){
                    this.setState({startupImage: base64.toString()})
                    this.setState({imageName: result.uri.substring(result.uri.lastIndexOf("/")+1)})
                }
                else {
                    Alert.alert('Kon afbeelding niet laden',
                        'Probeer een abfeelding van een kleiner formaat...',
                        [{text: 'OK'}])
                }
            }
        } catch (E) {
            console.log(E);
        }
    };

    deleteImage() {
        this.setState({
            startupImage: '',
            imageName: ''
        })
    }

    checkNameInput(name: string) {
        this.setState({
            startupNameValid: (name.trim().length > 0),
            startupName: name
        });
    }

    checkDescriptionInput(text: string) {
        this.setState({
            startupDescriptionValid: (text.trim().length > 0),
            startupDescription: text
        });
    }

    updateValid() {
        // Controleer alle velden
        this.checkNameInput(this.state.startupName);
        this.checkDescriptionInput(this.state.startupDescription);

        let validity = (
            this.state.startupNameValid
            && this.state.startupDescriptionValid
        )
        this.setState({isValid: validity}, () => {
            if (
                !this.state.isValid
            ) {
                Alert.alert(
                    'Invoer onjuist',
                    'Controleer of alle velden correct zijn ingevuld.',
                    [{text: 'OK'}])
                this.forceUpdate()
                return;
            }
            else {
                this.addStartup(this.makeData());
            }
        });
    }
    
    addStartup(data: any) {
        if (!this.state.isLoading) {
            this.setState({isLoading: true}, () => {
                bodyfull(ApiDictionary.addStartup, {data}
                ).then((result) => {
                        if (result.success === 1) {
                            this.successMessage();
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

    successMessage() {
        Alert.alert(
            'Succes!',
            'Uw post is succesvol opgeslagen. Ververs om de wijzigingen te zien.',
            [{text: 'OK', onPress: () => this.props.navigation.pop()}],)
    }

    makeData() {
        const data = {
            startupName: this.state.startupName,
            startupDescription: this.state.startupDescription,
            startupPhone: this.state.startupPhone,
            startupMail: this.state.startupMail,
            startupSite: this.state.startupSite,
            startupImage: this.state.startupImage
        }
        return data;
    }

    submitHandler() {
        this.updateValid()
    }
    
    
    render() {
        return (
            <ScrollView>
                <View style={styles.componentContainerBig} >
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Titel</Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="Naam..."
                            value={this.state.startupName}
                            onChangeText={name => this.checkNameInput(name)}
                            returnKeyType='next'
                            maxLength={45}
                        />
                        {!this.state.startupNameValid &&
                        <Text style={styles.error}>Veld mag niet leeg zijn</Text>
                        }
                    </View>

                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Beschrijving</Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="Beschrijving..."
                            value={this.state.startupDescription}
                            onChangeText={text => this.checkDescriptionInput(text)}
                            returnKeyType='next'
                            multiline={true}
                            numberOfLines={5}
                        />
                        {!this.state.startupDescriptionValid &&
                        <Text style={styles.error}>Veld mag niet leeg zijn</Text>
                        }
                    </View>

                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Telefoon</Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="+31 6..."
                            value={this.state.startupPhone}
                            onChangeText={number => this.setState({startupPhone: number})}
                            returnKeyType='next'
                            maxLength={15}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>E-mail adres</Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="E-mail..."
                            value={this.state.startupMail}
                            onChangeText={mail => this.setState({startupMail: mail})}
                            returnKeyType='next'
                            maxLength={45}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Website</Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="Url..."
                            value={this.state.startupSite}
                            onChangeText={site => this.setState({startupSite: site})}
                            returnKeyType='next'
                            maxLength={45}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        <Text style={styles.headLine}>Afbeelding</Text>
                        <View style={{padding: 10, borderBottomColor: '#D3D3D3', borderBottomWidth: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                {this.state.imageName === '' ? (
                                    <Ionicons
                                        style={{width: "35%", paddingTop: 5, flex: 1}}
                                        onPress={this.pickImage.bind(this)}
                                        name='md-camera' size={27} color={"grey"}/>
                                ) : (
                                    <Ionicons style={{width: '35%', paddingTop: 5, flex: 1}}
                                              onPress={this.deleteImage.bind(this)}
                                              name='md-trash' size={27} color={"grey"}/>
                                )}
                                <Text style={{paddingTop: 12, marginLeft: 13, flex: 7, textAlign: 'right', }}
                                      numberOfLines={1}
                                      ellipsizeMode={'head'}
                                >
                                    {this.state.imageName}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <Button title={'Aanmaken'} onPress={this.submitHandler.bind(this)}/>
                </View>
            </ScrollView>

        );
    }

    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Startup aanmaken'
        };
    }

}

const styles = StyleSheet.create({
    componentContainerBig: {
        margin: 20,
        paddingVertical: 20,
        backgroundColor: '#F4F4F4',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    inputBox: {
        width: '100%',
        // backgroundColor: 'blue',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    headLine: {
        fontStyle: 'italic',
        fontWeight: "bold",
        flex: 10,
        marginRight: 1
    },

    input: {
        textAlignVertical: 'top',
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },

    error: {
        color: '#AA0000',
        fontSize: 12
    }
});
