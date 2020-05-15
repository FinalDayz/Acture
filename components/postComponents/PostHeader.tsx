import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import colors from '../../constants/colors';

export interface Props {}

const PostHeader = (props: Props) => {
    return (
        <View style={styles.headerBackground}>
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
        </View>
    )
}

const styles = StyleSheet.create ({
    headerBackground: {
        backgroundColor: colors.postBody,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    header: {
        height: 60,
        width: '100%',
        backgroundColor: colors.postHeaderBlue,
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
        backgroundColor: colors.backgroundPrimary,
        height: 36,
        width: 36,
        borderRadius: 18,
        margin: 'auto'
    },
    textContainer: {
        alignSelf: 'flex-end',
        backgroundColor: colors.postHeaderTypeBlue,
        borderRadius: 20,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    name: {
        marginLeft: 10,
        color: colors.textLight,
        fontSize: 19
    },
    topic: {
        marginLeft: 10,
        color: '#212099',
        fontSize: 16,
    },
    postType: {
        paddingHorizontal: 10,
        marginRight: 10,
        fontSize: 16,
        fontStyle: 'italic',
        color: colors.textLight
    },
    date: {
        marginRight: 10,
        color: colors.textLight,
        textAlign: 'right',
        fontSize: 16
    }

});

export default PostHeader;