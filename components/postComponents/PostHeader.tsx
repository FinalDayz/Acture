import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface Props {}

const PostHeader = (props: Props) => {
    return (
        <View style={styles.header}>
            <View style={styles.horizontalFlex}>
                <View>
                    <View style={styles.profileImage}/>
                </View>
                <View style={styles.verticalFlex}>
                    <Text style={styles.name}>Lugus</Text>
                    <Text style={styles.topic}>Vakgebied</Text>
                </View>
                <View style={styles.verticalFlex}>
                    <View style={styles.textContainer}>
                        <Text style={styles.postType}>Nieuws</Text>
                    </View>
                    <Text style={styles.date}>11-05-2020</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    header: {
        height: 60,
        width: '100%',
        backgroundColor: '#A0A7F9',
        padding: 10,
        borderRadius: 20
    },
    horizontalFlex: {
        flexDirection: 'row'
    },
    verticalFlex: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    profileImage: {
        backgroundColor: 'white',
        height: 36,
        width: 36,
        borderRadius: 18,
        margin: 'auto'
    },
    textContainer: {
        paddingHorizontal: 3,
        backgroundColor: '#6C72EE',
        borderRadius: 20,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    name: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 19
    },
    topic: {
        marginLeft: 10,
        color: '#212099',
        fontSize: 16,
    },
    postType: {
        marginRight: 10,
        fontSize: 16,
        fontStyle: 'italic',
        color: '#fff'
    },
    date: {
        marginRight: 10,
        color: '#fff',
        textAlign: 'right',
        fontSize: 16
    }

});

export default PostHeader;