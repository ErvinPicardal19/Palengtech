/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import React, { useState } from 'react';
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

const userDatabase = [
    { email: 'ervinjohnpicardal@gmail.com', pwd: 'September152000' },
];

let email = '';
let pwd = '';

const Login = (props) => {
    //Hooks
    const [text, setText] = useState('');
    const [label, setLabel] = useState('Email');
    const [placeholder, setPlaceholder] = useState('email@gmail.com');
    const [buttonText, setButtonText] = useState('Next');
    const [loginState, setLoginState] = useState('email');

    //Button Handler for Login
    const onPressHandler = () => {
        if (text.length > 3) {
            if (loginState === 'email') {
                email = text;
                setLabel('Password');
                setPlaceholder('password');
                setButtonText('Login');
                setText('');
                setLoginState('password');
            } else if (loginState === 'password') {
                pwd = text;
                onLogin();
            }
        } else {
            ToastAndroid.show('Too Short!', ToastAndroid.LONG);
        }
    };

    //Simulating Logging in
    const onLogin = () => {
        const user = userDatabase.find((u) => {
            if (email === u.email && pwd === u.pwd) {
                return u;
            }
        });
        if (!user) {
            ToastAndroid.show('Incorrect Username or Password', ToastAndroid.LONG);
        } else {
            ToastAndroid.show(`Welcome ${user.email}`, ToastAndroid.LONG);
        }
        email = '';
        pwd = '';
        setLabel('Email');
        setPlaceholder('email@gmail.com');
        setButtonText('Next');
        setText('');
        setLoginState('email');
        props.setShowLogin(false);
        return;
    };

    //Login Popup
    return (
        <Modal
            visible={props.showLogin}
            transparent={true}
            onRequestClose={() => {
                props.setShowLogin(false);
                onLogin();
            }}
            animationType="fade"
        >
            <View style={styles.center_modal}>
                <View style={styles.warning_modal}>
                    <View style={styles.title_container}>
                        <Text style={styles.title_text}>
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
                            onPress={onPressHandler}
                        >
                            <Text style={styles.button_text}>
                                {buttonText}
                            </Text>
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
    },
    warning_modal: {
        width: 300,
        height: 350,
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
    },
    center_modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000055',
    },
});

export default Login;