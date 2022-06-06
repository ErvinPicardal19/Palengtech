/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, SafeAreaView, View, Text, Dimensions, StatusBar } from 'react-native';


import CartScreen from './CartScreen.js';
import CartBadge from './CartBadge.js';
import FavoritesBadge from './FavoritesBadge.js';

// const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHy09JUSZGoQfZ30g9d_WMUwmaC5dCAKQbn59gPeKo-jpUlNTsH4PrC2ZfxHNC_iZr5bk&usqp=CAU';

const width = Dimensions.get('window').width;

export default function Header(props) {

    const [showCheckout, setShowCheckout] = useState(false);

    const toggleCheckout = () => {
        setShowCheckout(!showCheckout);
    };

    const favorites = () => {
        props.navigation.navigate('Favorites');
    };

    return (
        <SafeAreaView style={styles.header}>
            <StatusBar
                backgroundColor={'#354D29'}
            />
            <Text style={styles.headerText}>{props.name}</Text>
            <CartScreen
                showCheckout={showCheckout}
                toggleCheckout={toggleCheckout}
            />
            <View style={{ right: 30, width: 50, height: 30, backgroundColor: '#00000000', position: 'absolute', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <CartBadge
                        showCheckout={showCheckout}
                        toggleCheckout={toggleCheckout}
                    />
                    <FavoritesBadge favorites={favorites} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#354D29',
        alignContent: 'center',
        paddingBottom: 20,
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Raleway-Regular',
        marginLeft: 20,
    },
    logo: {
        fontFamily: 'Raleway-Regular',
        fontSize: 25,
        color: '#354D29',
    },
});
