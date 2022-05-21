/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import Login from './Login.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function ShopScreen() {

    const [showCheckout, setShowCheckout] = useState(false);

    return (
        <View style={styles.body}>
            <View style={styles.checkout_icon}>
                <FontAwesome5.Button name={'shopping-cart'} />
            </View>
            <Text style={styles.text}>Shop Screen</Text>
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
    checkout_container: {
        width: 300,
        height: 350,
        backgroundColor: '#F5F5F5',
        borderRadius: 35,
    },
    checkout_icon: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    center_modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000055',
    },
    text: {
        color: '#354D29',
        margin: 10,
        fontSize: 20,
    },
});
