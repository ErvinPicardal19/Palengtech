/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home/HomeScreen.js';
import SingleStore from '../screens/Home/Store/SingleStore.js';
import FavoritesStack from '../screens/Profile/FavoritesStack.js';
import SingleProduct from '../screens/Home/Store/SingleProduct.js';
import CheckoutNavigator from './CheckoutNavigator.js';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Store"
                component={SingleStore}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Favorites"
                component={FavoritesStack}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SingleProduct"
                component={SingleProduct}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Checkout"
                component={CheckoutNavigator}
                options={{
                    // headerShown: false,
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#354D29' },
                    headerTitleStyle: { color: 'white' },
                }}
            />
        </Stack.Navigator>
    );
}

export default function HomeNavigator() {
    return <MyStack />;
}
