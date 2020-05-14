import React from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {CustomInput} from "./components/CustomInput";

export default function App() {


    return (
        <View style={styles.container}>
            <CustomInput/>

            <View>
              {/*<TextInput*/}
              {/*  onChangeText={text => {*/}
              {/*      if (text.trim() === '') {*/}
              {/*          Alert.alert('Niet valide');*/}
              {/*      }*/}
              {/*      // Andre checks*/}
              {/*      // if()*/}
              {/*  }}*/}
              {/*  keyboardType={'email-address'}/>*/}
              {/*  />*/}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
