/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    ScrollView,
    Dimensions,
    StyleSheet,
    Text,
} from 'react-native';

var { width } = Dimensions.get('window');

export default function FormContainer(props) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 100,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontFamily: 'Raleway-Regular',
        color: 'black',
    },
});
