/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';
import StoreCard from './StoreCard';

var { width } = Dimensions.get('window');

export default function StoreList(props) {
    const { item } = props;
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={{ width: '100%', backgroundColor: 'transparent' }}
            backgroundColor={'transparent'}
            onPress={() => props.navigation.navigate('Store', { item: item })}
        >
            <View style={{ backgroundColor: 'transparent', width: width }}
            >
                <StoreCard {...item} />
            </View>
        </TouchableOpacity>
    );

}
