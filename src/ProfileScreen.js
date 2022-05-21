/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import Login from './Login.js';

export default function ProfileScreen() {
    const [showLogin, setShowLogin] = useState(false);

    const onPressHandler_login = () => {
        setShowLogin(!showLogin);
    };

    return (
        <View style={styles.body}>
            <Login
                showLogin={showLogin}
                setShowLogin={setShowLogin}
            />

            <Text style={styles.text}>Profile</Text>
            <Pressable
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                style={({ pressed }) => [
                    { backgroundColor: pressed ? '#D3F2C2' : '#76AB5A' }
                    , styles.button]}
                onPress={onPressHandler_login}
            >
                <Text style={styles.text}> LOGIN </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 250,
        borderWidth: 1,
        borderColor: '#ABB861',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 15,
        backgroundColor: '#ffffff',
    },
    button: {
        width: 200,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        borderRadius: 25,

    },
    button_text: {
        color: '#ffffff',
        fontSize: 20,
    },
    text: {
        color: '#354D29',
        margin: 10,
        fontSize: 20,
    },
});
