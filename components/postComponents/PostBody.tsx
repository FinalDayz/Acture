import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../../constants/colors';

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
        backgroundColor: colors.postBody,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingBottom: 30
    },
    title: {
        marginHorizontal: 15,
        marginVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.textPostTitle
    },
    bodyText: {
        marginHorizontal: 15,
        fontSize: 15,
        color: colors.textPostContent
    }
});

export default PostBody;