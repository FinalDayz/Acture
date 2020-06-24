import {User} from "../../models/User";
import React from "react";
import {Image, ImageStyle, StyleProp, StyleSheet, View} from "react-native";

interface Props {
    image: string,
    style?: StyleProp<ImageStyle>

}

interface State {}

export class AccountImage extends React.Component<Props, State> {

    render() {
        return (
            <Image source={{uri: "data:image/png;base64," + this.props.image, scale: 1}}
                   style={[styles.profilePicture, this.props.style]}/>
        );
    }
}

const styles = StyleSheet.create({
    profilePicture: {
        backgroundColor: '#999',
        borderRadius: 40,
        height: 40,
        width: 40,
    },
});
