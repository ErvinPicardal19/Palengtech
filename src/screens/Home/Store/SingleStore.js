/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    Image,
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions,
    SafeAreaView,
    RefreshControl,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ProductList from './ProductList';

import data from '../../../../assets/data/products.json';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, clearCart } from '../../../redux/actions/cartActions.js';
import { setTotal } from '../../../redux/actions/actions.js';
import CartScreen from '../../../shared/CartScreen';

import { useNavigation } from '@react-navigation/native';
import baseUrl from '../../../../assets/common/baseUrl';
import axios from 'axios';

var { width } = Dimensions.get('window');

export default function SingleStore(props) {
    const store = props.route.params.item;
    const navigation = useNavigation();

    const { cart } = useSelector(state => state.cartItems);
    const { total } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [checkoutPressed, setCheckOutPressed] = useState(false);
    const [products, setProducts] = useState([]);
    const [availability, setAvailability] = useState(null);
    const [Refreshing, setRefreshing] = useState(false);
    // const [total, setTotal] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);

    const toggleCheckout = () => {
        setShowCheckout(!showCheckout);
    };

    useEffect(() => {
        // getProducts();
        updateTotal();

        axios
            .get(`${baseUrl}/product/${store._id}`)
            .then((res) => {
                setProducts(res.data);
            });

    }, [cart.length]);

    const updateTotal = () => {
        let price = 0;
        cart.forEach((item) => {
            return (price += (item.price * item.numOfOrder));
        });
        dispatch(setTotal(price));
    };


    const onRefresh = () => {
        setRefreshing(true);
        // setItems([...Items, { name: 'Item 69' }]);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    // const getProducts = () => {
    //     // console.log(i.OwnerID.$oid, store._id.$oid);
    //     setProducts(data.filter((i) => {
    //         if (i.OwnerID.$oid === store._id.$oid) {
    //             console.log(i.OwnerID.$oid, store._id.$oid);
    //             return i;
    //         }
    //     }));
    //     // console.log(products);
    // };


    const ShopBanner = () => {
        return (
            <View>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: store.image ? store.image : 'https://pngimg.com/uploads/box/box_PNG49.png' }}
                        style={styles.image}
                    />
                    <View
                        style={styles.filter}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentHeader}>{store.name}</Text>
                    {/* <Text style={styles.contentText}>{item.description}</Text> */}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <CartScreen
                showCheckout={showCheckout}
                toggleCheckout={toggleCheckout}
                navigation={navigation}
            />
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                {
                    products ?
                        <SafeAreaView style={{ backgroundColor: 'snow' }}>
                            <FlatList
                                bounces={false}
                                numColumns={2}
                                contentContainerStyle={{ paddingBottom: 200 }}
                                data={products}
                                renderItem={({ item }) => <ProductList
                                    key={item.description}
                                    product={item}
                                    updateTotal={updateTotal}
                                />
                                }
                                keyExtractor={(product, index) => index}
                                ListHeaderComponent={ShopBanner}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={Refreshing}
                                        onRefresh={onRefresh}
                                        colors={['#354D29']}
                                    />
                                }
                            />
                        </SafeAreaView>
                        :
                        null
                }
            </SafeAreaView>
            <View style={styles.bottomContainer}>
                <Text style={styles.price}>₱{total}</Text>
                <View style={styles.checkoutButton}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        style={{ padding: 10 }}
                        backgroundColor={'black'}
                        onPress={toggleCheckout}
                    >
                        <Text style={{ color: '#48B9F1', fontSize: 20, fontFamily: 'Raleway-Regular' }}>GO TO CART</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
        backgroundColor: 'white',
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0,
    },
    image: {
        width: '100%',
        height: 250,
    },
    filter: {
        backgroundColor: '#00000055',
        width: '100%',
        height: 250,
        position: 'absolute',
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentHeader: {
        fontSize: 30,
        color: 'black',
        marginBottom: 20,
        fontFamily: 'Raleway-Bold',
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    bottomContainer: {
        width: '100%',
        paddingBottom: 80,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: '#354D29',
        fontFamily: 'Raleway-Regular',
    },
    checkoutButton: {
        flexDirection: 'row',
        left: 200,
        top: 10,
        justifyContent: 'center',
        position: 'absolute',
    },
});
