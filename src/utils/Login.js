/* eslint-disable prettier/prettier */
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GlobalStyle from './GlobalStyle';

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
            props.setUsername(user.email);
            props.setPassword(user.pwd);
            props.setLogged_in(true);
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
                            onPress={onPressHandler}
                        >
                            <Text style={styles.button_text}>
                                {buttonText}
                            </Text>
                        </Pressable>
                        <Text onPress={() => { ToastAndroid.show('Under Contruction', ToastAndroid.LONG); }}>Forgot Password?</Text>
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