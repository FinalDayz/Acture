import {Props} from "react";
import React from "react";
import {View, Text} from "react-native";
import colors from "../constants/colors";

export class Hr extends React.Component<{}> {
    render() {
        return (
            <View
                style={{
                    borderTopColor: '#aaa',
                    borderTopWidth: 1,
                }}
            />
        );
    }
}
