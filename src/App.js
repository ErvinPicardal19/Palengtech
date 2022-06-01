/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import HomeNavigator from './Navigation/HomeNavigator.js';
import ProfileScreen from './screens/Profile/ProfileScreen.js';
// import ShopScreen from './screens/Shop/ShopScreen.js';
import ChatScreen from './screens/Chat/ChatScreen.js';
import AdminScreen from './screens/Admin/AdminScreen.js';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import Main from '../Navigator/Main.js';
import Header from '../src/shared/Header.js';

import { Provider } from 'react-redux';
import { Store } from './redux/store.js';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();


const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Header />
        <Tab.Navigator
          initialRouteName="Home"
          barStyle={{ backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#354D2955' }}
          activeColor="#76AB5A"
          inactiveColor="#ffffff"
          keyboardHidesNavigationBar={true}
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              if (route.name === 'Shop') {
                iconName = 'store';
                size = focused ? 23 : 20;
                color = focused ? '#76AB5A' : '#555';
              } else if (route.name === 'Chat') {
                iconName = 'comments';
                size = focused ? 23 : 20;
                color = focused ? '#76AB5A' : '#555';
              } else if (route.name === 'Profile') {
                iconName = 'user';
                size = focused ? 23 : 20;
                color = focused ? '#76AB5A' : '#555';
              } else if (route.name === 'Admin') {
                iconName = 'cog';
                size = focused ? 23 : 20;
                color = focused ? '#76AB5A' : '#555';
              }
              return (
                <View style={{ width: 29, justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome5
                    name={iconName}
                    size={size}
                    color={color}
                    style={{ position: 'relative' }}
                  />
                </View>
              );
            },
          }
          )}
        >
          <Tab.Screen
            name="Shop"
            component={HomeNavigator}
          />
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{ tabBarBadge: 21 }}
          />
          <Tab.Screen
            name="Admin"
            component={AdminScreen}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
