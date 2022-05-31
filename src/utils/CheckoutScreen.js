/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
} from 'react-native';

export default function CheckoutScreen(props) {
    return (
        <Modal
            visible={props.showCheckout}
            transparent={true}
            onRequestClose={() => {
                props.setShowCheckout(!props.showCheckout);
            }}
            animationType="fade"
        >
            <View style={styles.center_modal}>
                <View style={styles.checkout_container}>
                    <Text>Checkout Popup</Text>
                </View>
            </View>
        </Modal>
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
        height: 500,
        backgroundColor: '#F5F5F5',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
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
