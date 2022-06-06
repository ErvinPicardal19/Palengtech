/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import Header from '../../shared/Header';


export default function AdminScreen() {
    return (
        <View>
            <Header
                name={'My Shop'}
            />
            <Text style={styles.text}>Admin Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#354D29',
        margin: 10,
        fontSize: 20,
    },
});
