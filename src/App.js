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
import HomeScreen from './screens/HomeScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShopScreen from './screens/ShopScreen.js';
import ChatScreen from './screens/ChatScreen.js';

import { Provider } from 'react-redux';
import { Store } from './redux/store.js';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();


const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator
          barStyle={{ backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#354D2955' }}
          activeColor="#76AB5A"
          inactiveColor="#ffffff"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,

            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'house-user';
                size = focused ? 22 : 18;
                color = focused ? '#76AB5A' : '#555';
              } else if (route.name === 'Shop') {
                iconName = 'shopping-basket';
                size = focused ? 22 : 18;
                color = focused ? '#76AB5A' : '#555';
              } else if (route.name === 'Chat') {
                iconName = 'comments';
                size = focused ? 20 : 18;
                color = focused ? '#76AB5A' : '#555';
              } else if (route.name === 'Profile') {
                iconName = 'user';
                size = focused ? 22 : 18;
                color = focused ? '#76AB5A' : '#555';
              }
              return (
                <FontAwesome5
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            },
          }
          )}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen
            name="Shop"
            component={ShopScreen}
          />
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{ tabBarBadge: 21 }}
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

const styles = StyleSheet.create({

});

export default App;
