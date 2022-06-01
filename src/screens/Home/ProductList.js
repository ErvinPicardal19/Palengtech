/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';
import ProductCard from './ProductCard.js';

var { width } = Dimensions.get('window');

export default function ProductList(props) {
    const { item } = props;
    return (
        <TouchableOpacity
            style={{ width: '50%' }}
            onPress={() => props.navigation.navigate('Product', { item: item })}
        >
            <View style={{ backgroundColor: 'transparent' }}
            >
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    );

}
