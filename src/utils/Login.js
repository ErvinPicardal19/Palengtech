/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    RefreshControl,
    FlatList,
    SectionList,
    TextInput,
    Pressable,
    Alert,
    ToastAndroid,
    Modal,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from './GlobalStyle';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

import { useSelector, useDispatch } from 'react-redux';
import { setUser, setLogged_in } from '../redux/actions/actions.js';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    (error) => { console.log(error); }
);

const userDatabase = require('../../assets/data/Users.json');

let email = '';
let pass = '';

const Login = (props) => {
    // const { user, logged_in } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    //Hooks
    const [text, setText] = useState('');
    const [label, setLabel] = useState('Email');
    const [placeholder, setPlaceholder] = useState('email@gmail.com');
    const [buttonText, setButtonText] = useState('Next');
    const [loginState, setLoginState] = useState('email');

    useEffect(() => {
        createTable();
    }, [props.showLogin]);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Users(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Profile BLOB, Email TEXT, Username Text, Phone INTEGER, Location TEXT);'
            );
        }
        );
    };

    //Button Handler for Login
    const setData = () => {
        if (text.length > 3) {
            if (loginState === 'email' /*&& text.match('@gmail.com')*/) {
                email = text;
                setLabel('Password');
                setPlaceholder('password');
                setButtonText('Login');
                setLoginState('password');
            } else if (loginState === 'password') {
                pass = text;
                onLogin();
            } else {
                ToastAndroid.show('Invalid credentials', ToastAndroid.LONG);
            }
        } else {
            ToastAndroid.show('Too Short', ToastAndroid.LONG);
        }
    };

    //Simulating Logging in
    const onLogin = async () => {
        console.log(`Email:${email}\tPassword:${pass}`);
        const user = userDatabase.find((u) => {
            if (email === u.email && pass === u.pwd) {
                return u;
            }
        });
        console.log(user);
        if (!user) {
            ToastAndroid.show('Incorrect Username or Password', ToastAndroid.LONG);
        } else {
            try {
                dispatch(setUser({
                    name: user.name,
                    profile: user.img,
                    username: user.username,
                    email: user.email,
                    phone: Number(user.phone),
                    location: user.location,
                }));
                await db.transaction(async (tx) => {
                    await tx.executeSql(
                        "INSERT INTO Users (Name, Profile, Email, Username, Phone, Location) VALUES ('" + user.name + "','" + user.img + "','" + user.email + "','" + user.username + "'," + Number(user.phone) + ",'" + user.location + "');"
                    );
                });

                console.log('User have logged in');
            } catch (err) {
                console.log(err);
            }
            dispatch(setLogged_in(true));
        }
        setLabel('Email');
        setPlaceholder('email@gmail.com');
        setButtonText('Next');
        email = '';
        pass = '';
        setLoginState('email');
        props.setShowLoginHandler(false);
    };

    //Login Popup
    return (
        <Modal
            visible={props.showLogin}
            transparent={true}
            onRequestClose={() => {
                props.setShowLoginHandler(false);
                onLogin();
            }}
            animationType="fade"
        >
            <View style={styles.center_modal}>
                <View style={styles.warning_modal}>
                    <View style={styles.title_container}>
                        <Text style={
                            [styles.title_text,
                            GlobalStyle.CustomFont]
                        }>
                            ACCOUNT LOGIN
                        </Text>
                    </View>
                    <View style={styles.login_container}>
                        <View style={{ margin: 15 }}>
                            <Text style={{ color: '#ABB861' }}>
                                {label}
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder={placeholder}
                                secureTextEntry={loginState === 'password' ? true : false}
                                onChangeText={(value) => setText(value)}
                            />
                        </View>
                        <Pressable
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            style={({ pressed }) => [
                                { backgroundColor: pressed ? '#D3F2C2' : '#76AB5A' }
                                , styles.button]}
                            onPress={setData}
                        >
                            <Text style={styles.button_text}>
                                {buttonText}
                            </Text>
                        </Pressable>
                        <Text
                            onPress={() => { ToastAndroid.show('Under Contruction', ToastAndroid.LONG); }}
                            style={{ marginBottom: 10 }}
                        >
                            Forgot Password?
                        </Text>
                        <Text onPress={() => { ToastAndroid.show('Under Contruction', ToastAndroid.LONG); }}>Not yet a member?</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Pressable
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            style={({ pressed }) => [
                                { backgroundColor: pressed ? '#FFA733' : '#EA8600' }
                                , styles.google]}
                            onPress={() => { ToastAndroid.show('Under Contruction', ToastAndroid.LONG); }}
                        >
                            <View style={styles.google_contents}>
                                <FontAwesome5 name={'google'} style={{ marginRight: 15 }} size={17} />
                                <Text style={styles.google_text}>
                                    Login with Google
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                            style={({ pressed }) => [
                                { backgroundColor: pressed ? '#8b9dc3' : '#3b5998' }
                                , styles.facebook]}
                            onPress={() => { ToastAndroid.show('Under Contruction', ToastAndroid.LONG); }}
                        >
                            <View style={styles.facebook_contents}>
                                <FontAwesome5 name={'facebook'} style={{ marginRight: 15 }} size={17} />
                                <Text style={styles.facebook_text}>
                                    Login with Google
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
        fontFamily: 'Raleway-Regular',
    },
    warning_modal: {
        width: 300,
        height: 450,
        backgroundColor: '#F5F5F5',
        borderRadius: 35,
    },
    title_container: {
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#354D29',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    title_text: {
        color: '#ffffff',
        fontSize: 18,
        marginLeft: 30,
    },
    login_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginTop: 25,
    },
    google: {
        width: 250,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 20,
    },
    google_contents: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    google_text: {
        color: '#ffffff',
        fontSize: 15,
    },
    facebook: {
        width: 250,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    facebook_contents: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    facebook_text: {
        color: '#ffffff',
        fontSize: 15,
    },
    center_modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000055',
    },
});

export default Login;