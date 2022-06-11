/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import {
    Text,
    View,
    Button,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
// import FormContainer from '../../../shared/Form/FormContainer';
import Input from '../../../shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useSelector, useDispatch } from 'react-redux';

import { AuthContext } from '../../../context/AuthContext';
import { AxiosContext } from '../../../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Checkout(props) {

    const authContext = useContext(AuthContext)
    const { authAxios } = useContext(AxiosContext)

    const { cart } = useSelector(state => state.cartItems);
    // const { user } = useSelector(state => state.userReducer);

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState();

    useEffect(() => {
        getInfo();
        setOrderItems(cart);


        return () => {
            setOrderItems();
        };
    }, []);

    const getInfo = async () => {

        await AsyncStorage.getItem('user').then(async (id) => {
            await authAxios.get(`/user/${id}`).then((res) => {
                setName(res.data.name);
                setPhone(res.data.phone);
                setCity(res.data.location);
                setUser(id);
            })

        })

    };

    const checkOut = () => {
        const date = new Date();
        let order = {
            city,
            orderItems,
            phone,
            shippingAddress1: address,
            name,
            user,
        };

        props.navigation.navigate('Payment', { order });
    };

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={100}
            enableOnAndroid={true}
            style={{ backgroundColor: 'white' }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Choose your payment method</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                <View style={{ position: 'relative', marginLeft: '60%' }}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        onPress={() => checkOut()}
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
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        width: 100,
        backgroundColor: '#354D29',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 20,
    },
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
});
