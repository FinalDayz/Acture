import React from "react";
import {Button, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import InputScrollView from "react-native-input-scroll-view";
import colors from "../constants/colors";

export default class App extends React.Component {
    state = {
        text: '',
        textareaHeight: 200
    };


    render(){
        const { text, textareaHeight } = this.state;
        return (
            <InputScrollView style = {styles.screen}>
                <TextInput
                    style={styles.titleBox}
                    placeholder="Titel..."
                    placeholderTextColor="#003f5c"/>
                <TextInput />
                <TextInput
                    // style={styles.descriptionBox}
                   style={{backgroundColor:colors.inputfieldLight,
                       width:'100%',
                       borderRadius:3,
                       padding: 10,
                       height: textareaHeight}}
                    placeholder="Beschrijving..."
                    placeholderTextColor="#003f5c"
                    // style={{height: textareaHeight}}
                    value={text}
                    onChangeText={text => this.setState({ text })}
                    // onContentSizeChange={this._onContentSizeChange}
                    multiline />
                    <View>
                        {/*<TouchableOpacity style={styles.photoButton}>*/}
                        {/*    <Text> </Text>*/}
                        {/*</TouchableOpacity>*/}
                        <Button title="Foto"/>
                    </View>

            </InputScrollView>
        );
    }
    // _onContentSizeChange = ({nativeEvent:event}) => {
    //     this.setState({ textareaHeight: event.contentSize.height });
    // };
}




const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 50,
        paddingTop: 100
    },
    titleBox:{
        backgroundColor:colors.inputfieldLight,
        width:'100%',
        borderRadius:3,
        padding: 10,

    },
    photoButton:{
        width: 176,
        height: 39,
        color: "white",
        borderRadius: 10,
    }
    // descriptionBox:{
    //     backgroundColor:colors.inputfieldLight
    //     width:'100%',
    //     borderRadius:3,
    //     padding: 10,
    //
    // }

});
