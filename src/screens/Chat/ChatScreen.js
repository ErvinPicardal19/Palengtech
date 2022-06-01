/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    ImageBackground,
} from 'react-native';

import Header from '../../shared/Header';

export default function ChatScreen() {
    return (
        <View>
            <ImageBackground
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHy09JUSZGoQfZ30g9d_WMUwmaC5dCAKQbn59gPeKo-jpUlNTsH4PrC2ZfxHNC_iZr5bk&usqp=CAU' }}
                resizeMode="cover"
                style={{ paddingBottom: 10 }}
            >
                <Header />
            </ImageBackground>
            <Text style={styles.text}>Chat Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#354D29',
        margin: 10,
        fontSize: 20,
    },
});
