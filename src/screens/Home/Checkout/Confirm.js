/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';

import { View, Text, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { clearCart } from '../../../redux/actions/cartActions.js';

import { AuthContext } from '../../../context/AuthContext.js';
import { AxiosContext } from '../../../context/AxiosContext.js';

const { height } = Dimensions.get('window');

export default function Confirm(props) {

    const { authAxios } = useContext(AxiosContext);

    const dispatch = useDispatch();

    //Connecting to server
    const confirmOrder = () => {

        const orderedItems = confirm.order.order.orderItems.map((orderId) => {
            return { quantity: orderId.numOfOrder, product: orderId.productID }
        })

        console.log(confirm.paymentOption, confirm.paymentMethod);

        const order = {
            city: confirm.order.order.city,
            user: confirm.order.order.user,
            phone: confirm.order.order.phone,
            address: confirm.order.order.shippingAddress1,
            payment: {
                paymentOption: confirm.paymentOption,
                paymentMethod: confirm.paymentMethod,
            },
            orderItems: orderedItems,
            shop: confirm.order.order.orderItems[0].shop
        };

        authAxios
            .post(`/order`, order)
            .then((res) => {
                console.log(res.data);
            });
        dispatch(clearCart());
        props.navigation.navigate('Home');
        // setTimeout(() => {
        //     dispatch(clearCart());
        //     props.navigation.navigate('Home');
        // }, 500);
    };

    const { total } = useSelector(state => state.userReducer);

    const confirm = props.route.params;

    // console.log()

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Confirm Your Order</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                {
                    props.route.params ?
                        <View style={{ borderWidth: 1, borderColor: 'black', width: 250, padding: 10 }}>
                            <Text style={styles.order}>Receipt:</Text>
                            <View style={styles.listItem}>
                                <View>
                                    <Text style={{ color: 'black', fontFamily: 'Raleway-SemiBold' }}>Address:</Text>
                                    <Text style={{ color: 'black', fontFamily: 'Raleway-SemiBold' }}>City:</Text>
                                    <Text style={{ color: 'black', fontFamily: 'Raleway-SemiBold' }}>Name:</Text>
                                    <Text style={{ color: 'black', fontFamily: 'Raleway-SemiBold' }}>Phone:</Text>
                                </View>
                                <View>
                                    <Text>{confirm.order.order.shippingAddress1}</Text>
                                    <Text>{confirm.order.order.city}</Text>
                                    <Text>{confirm.order.order.name}</Text>
                                    <Text>0{confirm.order.order.phone}</Text>
                                </View>
                            </View>
                            <Text style={styles.order}>Items:</Text>
                            {/* <View style={styles.listItem}>
                                <Text>Items</Text>
                                <Text>Price</Text>
                                <Text>Quantity</Text>
                            </View> */}
                            <View style={styles.listItem}>
                                <View>
                                    <Text style={{ color: 'black', fontFamily: 'Raleway-SemiBold' }}>Items:</Text>
                                    {
                                        confirm.order.order.orderItems.map((i) => {
                                            return (
                                                <Text key={i.name}>{i.name}</Text>
                                            );
                                        })
                                    }
                                </View>
                                <View>
                                    <Text style={{ color: 'black', fontFamily: 'Raleway-SemiBold' }}>Price:</Text>
                                    {
                                        confirm.order.order.orderItems.map((i) => {
                                            return (

                                                <Text key={i.name}>₱{i.price}</Text>

                                            );
                                        })
                                    }
                                </View>
                                <View>
                                    <Text style={{ color: 'black', fontFamily: 'Raleway-SemiBold' }}>Quantity:</Text>
                                    {
                                        confirm.order.order.orderItems.map((i) => {
                                            return (

                                                <Text key={i.name}>{i.numOfOrder}</Text>

                                            );
                                        })
                                    }
                                </View>
                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 8 }} />
                            <View style={{ ...styles.listItem, marginTop: 10 }}>
                                <Text>Total:</Text>
                                <Text>₱{total}</Text>
                            </View>
                        </View>
                        :
                        null
                }
                {
                    props.route.params ?
                        <View style={{ alignItems: 'center', margin: 20 }}>
                            <Button title={'Place Order'} onPress={() => confirmOrder()} />
                        </View>
                        :
                        null
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height,
        alignContent: 'center',
        backgroundColor: 'white',
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
    order: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontFamily: 'Raleway-Bold',
        color: 'black',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});
