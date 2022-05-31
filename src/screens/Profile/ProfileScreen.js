/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    ToastAndroid,
} from 'react-native';
import FavoritesStack from './FavoritesStack.js';
import ProfileStack from './ProfileStack.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import { useSelector, useDispatch } from 'react-redux';
// import { setEmail, setPassword } from '../redux/actions.js';

const Stack = createStackNavigator();

// const db = SQLite.openDatabase(
//     {
//         name: 'MainDB',
//         location: 'default',
//     },
//     () => { },
//     (error) => { console.log(error); }
// );

export default function ProfileScreen() {
    return (
        <Stack.Navigator
            initialRouteName={'Profile'}
            detachInactiveScreens={true}
        >
            <Stack.Screen
                name="Me"
                component={ProfileStack}
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen
                name="Favorites"
                component={FavoritesStack}
                options={{
                    header: () => null,
                }}
            />
        </Stack.Navigator>
    );
}
