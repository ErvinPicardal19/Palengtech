/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Button,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FormContainer from '../../../shared/Form/FormContainer';
import Input from '../../../shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SQLite from 'react-native-sqlite-storage';

import { useSelector, useDispatch } from 'react-redux';


const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    (error) => { console.log(error); }
);



export default function Checkout(props) {

    const { cart } = useSelector(state => state.cartItems);
    const { user } = useSelector(state => state.userReducer);

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        getInfo();
        setOrderItems(cart);


        return () => {
            setOrderItems();
        };
    }, []);

    const getInfo = () => {
        setName(user.name);
        setPhone(user.phone);
        setCity(user.location);
    };

    const checkOut = () => {
        let order = {
            city,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            name,
        }

        props.navigation.navigate('Payment', { order: order });
    };

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={100}
            enableOnAndroid={true}
        >
            <FormContainer
                title={'Shipping Address'}
            >
                <Input
                    placeholder={'Phone'}
                    name={'Phone'}
                    value={'0' + phone.toString()}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={'Shipping Address 1'}
                    name={'Shipping Address 1'}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                <Input
                    placeholder={'Name'}
                    name={'Name'}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={'City'}
                    name={'City'}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={{ color: 'white' }}>CONFIRM</Text>
                </TouchableOpacity>

            </FormContainer>

        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        backgroundColor: '#354D29',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 20,
    }
});