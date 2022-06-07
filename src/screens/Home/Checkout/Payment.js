/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native';

import RadioButtonRN from 'radio-buttons-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'MasterCard', value: 3 },
    { name: 'Other', value: 4 },
];

const onlinePayments = [
    { name: 'Gcash', value: 1 },
    { name: 'PayMaya', value: 2 },
    { name: 'PayPal', value: 3 },
];

const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'Online Payment', value: 2, options: onlinePayments },
    { name: 'Card Payment', value: 3, options: paymentCards },
];


export default function Payment(props) {

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const order = props.route.params;

    const [selected, setSelected] = useState();
    const [payment, setPayment] = useState();

    // console.log(order);

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Choose your payment method</Text>
            </View>
            <View style={{ backgroundColor: 'white' }}>
                {
                    methods.map((item, i) => {
                        return (
                            <View key={item.name}>
                                <Pressable
                                    style={({ pressed }) => [
                                        { backgroundColor: pressed ? 'gainsboro' : 'white' },
                                        styles.buttonContainer,
                                    ]}
                                    onPress={() => setSelected(item.value)}
                                >
                                    <Text style={{ color: 'black', fontFamily: 'Raleway-Regular' }}>{item.name}</Text>
                                </Pressable>
                                {
                                    selected === 1 ?
                                        null
                                        :
                                        selected === item.value ?
                                            <Picker
                                                mode={'dialog'}
                                                prompt={item.name}
                                                dropdownIconRippleColor={'#D3F2C2'}
                                                style={styles.picker}
                                                selectedValue={payment}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setPayment(itemValue)
                                                }>
                                                {
                                                    item.options.map((option, index) => {
                                                        return (
                                                            <Picker.Item key={index} label={option.name} value={option.value} />
                                                        );
                                                    })
                                                }
                                            </Picker>
                                            :
                                            null
                                }
                            </View>
                        );
                    })
                }
                <View style={styles.backContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('Address')}
                    >
                        <Text style={{ color: 'white' }}>Back</Text>
                        <Ionicons
                            name={'chevron-back-outline'}
                            size={23}
                            color={'white'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.confirmContainer}>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('Confirm', { order })}
                    >
                        <Text style={{ color: 'white' }}>Confirm</Text>
                        <Ionicons
                            name={'chevron-forward-outline'}
                            size={23}
                            color={'white'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#354D29',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Raleway-Bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#00000011',
        paddingLeft: 20,
    },
    picker: {
        backgroundColor: '#F1F1F1',
        color: 'black',
    },
    confirmButton: {
        flexDirection: 'row',
        backgroundColor: '#354D29',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 20,
    },
    confirmContainer: {
        position: 'absolute',
        width: 100,
        height: 50,
        marginTop: 300,
        marginLeft: 230,
    },
    backButton: {
        flexDirection: 'row',
        backgroundColor: '#354D29',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 20,
    },
    backContainer: {
        position: 'absolute',
        width: 100,
        height: 50,
        marginTop: 300,
        marginLeft: 30,
    }
});
