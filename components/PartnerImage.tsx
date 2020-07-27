import React from "react";
import {Image, ImageStyle, StyleProp, StyleSheet, View} from "react-native";

export interface Props {
    image: any,
    style?: StyleProp<ImageStyle>
}

interface State {}

export class PartnerImage extends React.Component<Props, State> {

    render() {
        return (
            <Image 
                source={{uri: "data:image/png;base64," + this.props.image["image"], scale: 1}}
                resizeMode='contain'       
                style={[styles.partnerPicture, this.props.style]}/>
        );
    }
}

const styles = StyleSheet.create({
    partnerPicture: {
        width: 170,
        height: 140,
        marginVertical: 15
    },
});
