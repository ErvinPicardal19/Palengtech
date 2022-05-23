/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';


export default function HomeScreen() {
    return (
        <View style={styles.body}>
<<<<<<< HEAD
            <Text style={styles.text}>Cribbbss Screen</Text>
=======
            <Text style={styles.text}>Crib Screen</Text>
>>>>>>> ff41a35e694ad25c007c782873834ba05db3f60b
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
