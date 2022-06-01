/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StyleSheet, Image, SafeAreaView, View, Text, ImageBackground } from 'react-native';

const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHy09JUSZGoQfZ30g9d_WMUwmaC5dCAKQbn59gPeKo-jpUlNTsH4PrC2ZfxHNC_iZr5bk&usqp=CAU';

export default function Header() {


    return (
        <SafeAreaView style={styles.header}>
            <View>
                <Image
                    source={require('../../assets/PALENGTECH_LOGO_ECO_BAG.png')}
                    style={{ width: 60, height: 50, marginTop: 10 }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    logo: {
        paddingTop: 10,
        fontFamily: 'Raleway-Regular',
        fontSize: 25,
        color: '#354D29',
    },
});
