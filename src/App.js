/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import { AuthContext } from './context/AuthContext.js';
import * as Keychain from 'react-native-keychain';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
import Login from './utils/Login.js';
import Main from './Navigation/Main.js';

const App = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading') {
    return (
      <View style={[styles.body, { backgroundColor: '#f2f2f2' }]}>
        <ActivityIndicator size="large" color="#354D29" />
      </View>
    )
  }

  if (authContext?.authState?.authenticated === false) {
    return <Login />;
  } else {
    return <Main />;
  }
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;


