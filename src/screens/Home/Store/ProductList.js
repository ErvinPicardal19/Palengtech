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

import ProductCard from './ProductCard';

var { width } = Dimensions.get('window');

export default function ProductList(props) {
    const { product } = props;
    return (
        <View style={{ width: width / 2 }}>
            <View style={{ backgroundColor: 'transparent' }}
            >
                <ProductCard
                    {...product}
                    updateTotal={props.updateTotal}
                />
            </View>
        </View>
    );
}
