/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';


import HomeNavigator from './HomeNavigator.js';
import ProfileScreen from '../screens/Profile/ProfileScreen.js';
// import ShopScreen from './screens/Shop/ShopScreen.js';
import ChatScreen from '../screens/Chat/ChatScreen.js';
import AdminScreen from '../screens/Admin/AdminScreen.js';

import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Store } from '../redux/store.js';

const tabs = {
    Shop: {
        icon: ({ progress, focused }) => {
            return (
                <Ionicons name={'ios-home-outline'}
                    color={focused ? 'white' : '#555'}
                    size={25}
                />
            );
        },
    },
    Chat: {
        icon: ({ progress, focused }) => {
            return (
                <Ionicons name={'chatbubbles-outline'}
                    color={focused ? 'white' : '#555'}
                    size={25}
                />
            );
        },
    },
    Admin: {
        icon: ({ progress, focused }) => {
            return (
                <Ionicons
                    name={'apps-outline'}
                    size={25}
                    color={focused ? 'white' : '#555'}
                />
            );
        },
    },
    Profile: {
        icon: ({ progress, focused }) => {
            return (
                <Ionicons
                    name={'person-outline'}
                    size={25}
                    color={focused ? 'white' : '#555'}
                />
            );
        },
    },
};

const Tab = createBottomTabNavigator();


const Main = () => {

    const { width } = useWindowDimensions();
    return (
        <Provider store={Store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName={'Shop'}
                        tabBar={props => (
                            <AnimatedTabBar
                                tabs={tabs}
                                {...props}
                                titleShown={false}
                                barWidth={width}
                                dotColor={'#76AB5A'}
                                barColor={'#D3F2C2'}
                            />
                        )}
                    >
                        <Tab.Screen
                            name="Shop"
                            component={HomeNavigator}
                            options={{
                                header: () => null,
                            }}
                        />
                        <Tab.Screen
                            name="Chat"
                            component={ChatScreen}
                            options={{
                                header: () => null,
                            }}
                        />
                        <Tab.Screen
                            name="Admin"
                            component={AdminScreen}
                            options={{
                                header: () => null,
                            }}
                        />
                        <Tab.Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{
                                header: () => null,
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
};

export default Main;
