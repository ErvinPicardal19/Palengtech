/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Checkout from '../screens/Home/Checkout/Checkout';
import Payment from '../screens/Home/Checkout/Payment';
import Confirm from '../screens/Home/Checkout/Confirm';
import { View } from 'react-native';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                swipeEnabled: false,
                lazy: true,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: 'gainsboro',
                tabBarPressColor: 'transparent',
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontFamily: 'Raleway-SemiBold',
                },
                tabBarStyle: {
                    backgroundColor: 'white',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#4BBBF2',
                }
            }}
        >
            <Tab.Screen name="Address" component={Checkout} />
            <Tab.Screen name="Payment" component={Payment} />
            <Tab.Screen name="Confirm" component={Confirm} />
        </Tab.Navigator>
    );
}

export default function CheckoutNavigator() {
    return <MyTabs />;
}
