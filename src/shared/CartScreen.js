/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    Button,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart, newRender } from '../redux/actions/cartActions';
import { setTotal } from '../redux/actions/actions.js';

export default function CartScreen(props) {

    const { cart } = useSelector(state => state.cartItems);
    const { logged_in, total } = useSelector(state => state.userReducer);
    const [totalPrice, setTotalPrice] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        getTotal();
    }, [totalPrice]);

    const getTotal = () => {
        let price = 0;
        cart.forEach((item) => {
            price += (item.price * item.numOfOrder);
        });
        setTotalPrice(price);
        dispatch(setTotal(price));
    };

    return (
        <Modal
            visible={props.showCheckout}
            transparent={true}
            onRequestClose={props.toggleCheckout}
            animationType="slide"
        >
            <View style={styles.center_modal}>
                <View style={styles.checkout_container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Cart</Text>
                    </View>
                    {
                        cart.length > 0 ?
                            <ScrollView>
                                {
                                    cart.map((item) => {
                                        const num = item.numOfOrder;
                                        return (
                                            <View style={styles.itemContainer} key={item.productID}>
                                                <View>
                                                    <Text style={{ marginLeft: 5, color: 'black', fontFamily: 'Raleway-Regular' }}>{item.name}</Text>
                                                </View>
                                                <View style={styles.price}>
                                                    <Text style={{ color: 'green' }}>₱{item.price * item.numOfOrder}</Text>
                                                </View>
                                                <View style={styles.orderCountContainer}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            item.numOfOrder += 1;
                                                            getTotal();
                                                        }}
                                                    >
                                                        <Ionicons
                                                            name={'add-outline'}
                                                            backgroundColor={'transparent'}
                                                            color={'black'}
                                                            size={30}
                                                        />
                                                    </TouchableOpacity>
                                                    <Text style={styles.counter}>{item.numOfOrder}</Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            item.numOfOrder -= 1;
                                                            if (item.numOfOrder <= 0) {
                                                                dispatch(removeFromCart(item));
                                                            } else {
                                                                getTotal();
                                                            }
                                                        }}
                                                    >
                                                        <Ionicons
                                                            name={'remove-outline'}
                                                            backgroundColor={'transparent'}
                                                            color={'black'}
                                                            size={30}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                            </ScrollView>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'transparent' }}>
                                <Text>Looks like your cart is empty</Text>
                            </View>
                    }
                    <View style={{ flexDirection: 'row', height: 40 }}>
                        <Text style={{ marginLeft: 10, color: '#354D29', fontSize: 18, fontFamily: 'Raleway-Regular', marginTop: -5 }}>₱{total}</Text>
                        <View style={styles.submitContainer}>
                            <TouchableOpacity
                                backgroundColor={'transparent'}
                                onPress={() => dispatch(clearCart())}
                            >
                                <Text style={{ color: 'red', fontFamily: 'Raleway-Regular' }}>CLEAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                backgroundColor={'transparent'}
                                onPress={() => logged_in ? props.navigation.navigate('Checkout') : ToastAndroid.show('Please login first', ToastAndroid.SHORT)}
                            >
                                <Text style={{ color: '#48B9F1', fontFamily: 'Raleway-Regular' }}>CHECKOUT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: '#354D29',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 25,
    },
    title: {
        color: 'white',
        fontSize: 30,
        padding: 10,
        fontFamily: 'Raleway-Regular',
    },
    price: {
        position: 'absolute',
        marginLeft: 80,
    },
    itemContainer: {
        flexDirection: 'row',
        height: 80,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#00000011',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    orderCountContainer: {
        flexDirection: 'row',
        position: 'absolute',
        marginLeft: 150,
        justifyContent: 'space-evenly',
        width: 150,
    },
    counter: {
        fontSize: 15,
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        color: 'black',
        borderRadius: 5,
        elevation: 3,
    },
    checkout_container: {
        width: 300,
        height: 600,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
    },
    submitContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 200,
        position: 'absolute',
        marginLeft: 100,
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
