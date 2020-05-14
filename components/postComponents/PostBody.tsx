import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface Props {}

const PostBody = (props: Props) => {
    return (
        <View style={styles.body}>
            <Text style={styles.title} >Dit is een component!</Text>
            <Text style={styles.bodyText} >Dit is opvultekst want ik wist niks beters te verzinnen dan dit en ik had geen zin om Lorem Ipsum op te zoeken. Maar hopelijk vinden jullie dat niet erg.</Text>
        </View>
    );
}

const styles = StyleSheet.create ({
    body: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    title: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#434343'
    },
    bodyText: {
        paddingHorizontal: 15,
        fontSize: 15,
        color: '#434343'
    }
});

export default PostBody;