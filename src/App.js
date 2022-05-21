/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
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
import Login from './Login.js';
import HomeScreen from './HomeScreen.js';
import ProfileScreen from './ProfileScreen.js';
import ShopScreen from './ShopScreen.js';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();



const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#354D2955' }}
        activeColor="#76AB5A"
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
          options={{ tabBarBadge: 3 }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopScreen}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
