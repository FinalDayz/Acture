import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Image from 'react-native-scalable-image';

import colors from '../constants/colors';
import HeaderButton from '../components/HeaderButton';
import {PostModel} from '../models/PostModel';
import { User } from '../models/User';
import { Ionicons } from '@expo/vector-icons';

export interface Props {
    navigation: any
}

interface State {
    isLoading: boolean,
    data: PostModel[]
}

const windowWidth = Dimensions.get('window').width;

export default class AboutScreen extends React.Component<Props, State> {

    state: State;

    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            data: [],
            isLoading: false
        }
    }

    render() {
        return(
            <View style={this.styles.screen}>
                <ScrollView style={this.styles.scrollable}>
                    <View style={this.styles.scrollContainer}>
                        <View style={this.styles.logo}>
                            {/* not a normal Image object, documentation found in: https://www.npmjs.com/package/react-native-scalable-image */}
                            <Image
                                width={windowWidth * 0.7}
                                source={require('../assets/LGS_LOGO_WIT.png')}/>
                        </View>
                        <View style={this.styles.descriptionContainer}>
                            <Text style={this.styles.descriptionText}>Lugus is een vereniging voor en door studentondernemers. Wij faciliteren en ondersteunen studentondernemers bij hun ondernemende wensen. Wij geloven dat (innovatieve) start-ups en ondernemers cruciaal zijn voor de samenleving en dat studenten hier een belangrijk onderdeel van vormen.</Text>
                        </View>
                        <View style={this.styles.infoContainer}>
                            <Text style={this.styles.infoTitle}>Contact</Text>
                            <View style={this.styles.infoFlex}>
                                <Text style={this.styles.infoTextBold}>Bel: </Text>
                                <Text style={this.styles.infoText}> +31 61 655 69 59</Text>
                            </View>
                            <View style={this.styles.infoFlex}>
                                <Text style={this.styles.infoTextBold}>Email: </Text>
                                <Text style={this.styles.infoText}>bestuur@lugus.nu</Text>
                            </View>
                            <View style={this.styles.infoFlex}>
                                <Text style={this.styles.infoTextBold}>Kom langs: </Text>
                                <Text style={this.styles.infoText}>Langegracht 70,{"\n"}2312 NV{"\n"}Leiden</Text>
                            </View>

                            <Text style={this.styles.infoTitle}>Openingstijden</Text>
                            <Text style={this.styles.infoText}>Elke werkdag: 08:30 – 17:00</Text>
                            <Text style={this.styles.infoText}>Voor onze community: 24/7 toegangelijk</Text>
                            
                            <Text style={this.styles.infoTitle}>Volg Ons</Text>
                            <View style={this.styles.socialmediaFlex}>
                                <View style={this.styles.socialmediaLogo}><Ionicons name='logo-instagram' size={30} color={colors.textDark}/></View>                    
                                <Text style={this.styles.infoTextBold}> @Lugus</Text>
                            </View>
                            <View style={this.styles.socialmediaFlex}>
                                <View style={this.styles.socialmediaLogo}><Ionicons name='logo-twitter' size={30} color={colors.textDark}/></View>                    
                                <Text style={this.styles.infoTextBold}>@Lugus</Text>
                            </View>
                            <View style={this.styles.socialmediaFlex}>
                                <View style={this.styles.socialmediaLogo}><Ionicons name='logo-facebook' size={30} color={colors.textDark}/></View>                    
                                <Text style={this.styles.infoTextBold}> @Lugus</Text>
                            </View>
                            <View style={this.styles.socialmediaFlex}>
                                <View style={this.styles.socialmediaLogo}><Ionicons name='logo-linkedin' size={30} color={colors.textDark}/></View>                    
                                <Text style={this.styles.infoTextBold}> @Lugus</Text>
                            </View>
                        </View>
                        <View style={this.styles.infoContainer}>
                            <Text style={this.styles.infoTitle}>Onze Partners</Text>
                            <Text style={this.styles.infoText}>Logo van partner</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            
        );
    }


    //options for header bar. Default options are in the navigator.
    static navigationOptions = (navData:any) => {
        return {
            headerTitle: 'Over ons',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                    title='profile'
                    iconName='md-person' //TODO: change to profile picture
                    onPress={() => {
                        navData.navigation.navigate('Profile', {id: User.getLoggedInUser().userId})
                    }}/>
                </HeaderButtons>
            )
        }
    };

    styles = StyleSheet.create ({
        screen: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary
        },
        scrollable: {
            flex: 1,
            width: '100%',
            height: '100%'
        },
        scrollContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        logo: {
            marginVertical: 20
        },
        descriptionContainer: {
            width: "80%",
            alignSelf: 'center',
            marginVertical: 20,
        },
        descriptionText: {
            fontSize: 19,
            color: colors.textLight,
            textAlign: 'center'
        },
        infoContainer: {
            width: "80%",
            backgroundColor: colors.backgroundPrimary,
            borderRadius: 30,
            marginVertical: 20,
            paddingHorizontal: 25,
            paddingTop: 5,
            paddingBottom: 20,
        },
        infoTitle: {
            fontSize: 30,
            alignSelf: 'center',
            fontWeight: 'bold',
            color: colors.textDark,
            marginTop: 12,
            marginBottom: 6
        },
        infoFlex: {
            flexDirection: 'row',
            width: "100%",
        },
        infoText: {
            fontSize: 16,
            color: colors.textDark,
            marginVertical: 4
        },
        infoTextBold: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.textDark,
            marginVertical: 4
        },
        socialmediaFlex: {
            flexDirection: 'row',
            width: "100%",
            marginBottom: 10
        },
        socialmediaLogo: {
            marginRight: 20
        }
    });
}    
