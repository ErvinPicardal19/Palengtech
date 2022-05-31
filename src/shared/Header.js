/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Image, SafeAreaView, View, Text } from 'react-native';

export default function Header() {


    return (
        <SafeAreaView style={styles.header}>
            <Text style={styles.logo}>PALENGTECH</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 15,
        backgroundColor: '#D3F2C2',
    },
    logo: {
        paddingTop: 10,
        fontFamily: 'Raleway-Regular',
        fontSize: 25,
        color: '#354D29',
    },
});
