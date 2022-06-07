/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions,
    Text,
    StyleSheet,
    ImageBackground,
    ToastAndroid,
    Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/actions/cartActions.js';

const { width } = Dimensions.get('window');

export default function ProductCard(props) {

    const { cart } = useSelector(state => state.cartItems);
    const dispatch = useDispatch();


    const { _id, countInStock, name, img, description, price, numReviews, rating, isFeatured, OwnerID, __v } = props;

    return (
        <View style={{ margin: 5, borderRadius: 25, elevation: 25 }}>
            <ImageBackground
                source={{ uri: img }}
                style={styles.container}
                borderTopLeftRadius={15}
                borderTopRightRadius={15}
            >
                <View style={styles.titleContainer}>
                    <Text style={name.length > 3 ? { ...styles.title, fontSize: 13 } : { ...styles.title, fontSize: 15 }}>
                        {name}
                    </Text>
                </View>
                <View style={styles.price}>
                    <Text
                        style={price.toString().length > 3 ? styles.price_long : styles.price_short}
                    >
                        ₱{price}
                    </Text>
                    <Ionicons
                        name={'pricetag-outline'}
                        color={'black'}
                        width={0}
                    />
                </View>
            </ImageBackground>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Pressable
                    style={({ pressed }) => [
                        { backgroundColor: pressed ? '#D3F2C2' : '#354D29' },
                        styles.add,
                    ]}
                    onPress={() => {
                        let includes = false;
                        for (let i of cart) {
                            console.log(i.productID, _id);
                            if (i.productID === _id) {
                                includes = true;
                                break;
                            } else {
                                includes = false;
                            }
                        }
                        console.log(!includes);
                        if (!includes) {
                            dispatch(addToCart({ name: name, productID: _id, price: price, numOfOrder: 1, img: img }));
                            props.updateTotal(price);
                        } else {
                            ToastAndroid.show('Item is already in the cart', ToastAndroid.SHORT);
                        }
                    }
                    }
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>ADD</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 10,
        height: width / 1.7,
        borderRadius: 15,
        backgroundColor: 'transparent',
    },
    image: {
        width: (width / 2) - 20 - 10,
        height: (width / 2) - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45,
    },
    price: {
        flexDirection: 'row',
        marginTop: 150,
        marginLeft: 80,
        backgroundColor: 'white',
        padding: 5,
        elevation: 15,
        width: 80,
        borderRadius: 30,
        position: 'absolute',
    },
    price_short: {
        fontSize: 20,
        color: 'black',
    },
    price_long: {
        fontSize: 18,
        color: 'black',
    },
    titleContainer: {
        position: 'absolute',
        marginLeft: 85,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 130,
        width: 70,
        backgroundColor: '#354D2999',
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    title: {
        fontFamily: 'Raleway-Regular',
        color: 'white',
        textAlign: 'center',
    },
    add: {
        width: '100%',
        padding: 10,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
});
