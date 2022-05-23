/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
} from 'react-native';
import Login from '../utils/Login.js';

export default function ProfileScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [logged_in, setLogged_in] = useState(false);

    const onPressHandler_login = () => {
        setShowLogin(!showLogin);
    };

    return (
        <View style={styles.body}>
            <Login
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                username={username}
                setUsername={setUsername}
                logged_in={logged_in}
                setLogged_in={setLogged_in}
                password={password}
                setPassword={setPassword}
            />
            <Text style={styles.text}>Profile</Text>
            {
                logged_in ?
                    <Image
                        style={{ height: 200, width: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000', borderRadius: 100 }}
                        source={{ uri: 'https://mb.com.ph/wp-content/uploads/2020/11/Robin-Padilla.png' }}
                    />
                    :
                    null
            }
            {
                logged_in ?
                    <View>
                        <Text> {username} </Text>
                    </View>
                    :
                    <Pressable
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? '#D3F2C2' : '#76AB5A' }
                            , styles.button]}
                        onPress={onPressHandler_login}
                    >
                        <Text style={styles.text}> LOGIN </Text>
                    </Pressable>
            }
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
