/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    ToastAndroid,
} from 'react-native';
import Login from '../../utils/Login.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import { setUser, setLogged_in } from '../../redux/actions/actions.js';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    (error) => { console.log(error); }
);

export default function ProfileStack({ navigation }) {

    const { user, logged_in } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [showLogin, setShowLogin] = useState(false);
    // const [logged_in, setLogged_in] = useState(false);

    useEffect(() => {
        createTable();
        getData();
    }, [logged_in]);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Users(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Profile BLOB, Email TEXT, Username Text, Phone INTEGER, Location TEXT);'
            );
        }
        );
    };

    const setShowLoginHandler = () => {
        setShowLogin(!showLogin);
    };

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT Name, Profile, Email, Username, Phone, Location FROM Users',
                    [],
                    (_tx, results) => {
                        console.log(results.rows.item(0));
                        var len = results.rows.length;
                        if (len > 0) {
                            var myName = results.rows.item(0).Name;
                            var profilePic = results.rows.item(0).Profile;
                            var userName = results.rows.item(0).Username;
                            var myEmail = results.rows.item(0).Email;
                            var phoneNum = results.rows.item(0).Phone;
                            var myLocation = results.rows.item(0).Location;

                            // console.log(myName, profilePic, myEmail, userName, phoneNum, myLocation);
                            dispatch(setUser({
                                name: myName,
                                profile: profilePic,
                                username: userName,
                                email: myEmail,
                                phone: phoneNum,
                                location: myLocation,
                            }));
                            dispatch(setLogged_in(true));
                            setShowLogin(false);
                        } else {
                            dispatch(setLogged_in(false));
                            setShowLogin(true);
                        }
                    }
                );
            });
        } catch (err) {
            console.log(err);
        }
    };

    const logout = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    'DROP TABLE Users;'
                );
                dispatch(setUser({
                    name: '',
                    profile: null,
                    username: '',
                    email: '',
                    phone: null,
                    location: '',
                }));
                dispatch(setLogged_in(false));
                ToastAndroid.show('Logged out successfully', ToastAndroid.LONG);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const favoritesHandler = () => {
        navigation.navigate('Favorites');
    };

    return (
        <View style={styles.body}>
            <Login
                showLogin={showLogin}
                setShowLoginHandler={setShowLoginHandler}
                logged_in={logged_in}
            />
            <View style={{ backgroundColor: '#D3F2C2', marginTop: 10 }}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profile}
                        source={logged_in ? { uri: user.profile } : require('../../../assets/DefaultProfile.png')}
                    />
                    <View style={styles.profileName}>
                        <Text
                            style={{ color: '#2E4323', fontSize: 20, fontFamily: 'Raleway-SemiBold' }}
                        >
                            {user.name}
                        </Text>
                        <Text style={styles.username}>{user.username}</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.Icons}>
                        <View style={styles.label}>
                            <FontAwesome5
                                size={15}
                                color={'#354D29'}
                                style={styles.iconSize}
                                name={'map-marked'}
                            />
                            <Text style={styles.labelText}>{user.location}</Text>
                        </View>
                        <View style={styles.label}>
                            <FontAwesome5
                                size={15}
                                color={'#354D29'}
                                style={styles.iconSize}
                                name={'phone'}
                            />
                            <Text style={styles.labelText}>
                                {logged_in ? `+63${user.phone}` : null}
                            </Text>
                        </View>
                        <View style={styles.label}>
                            <FontAwesome5
                                size={15}
                                color={'#354D29'}
                                style={styles.iconSize}
                                name={'envelope'}
                            />
                            <Text style={styles.labelText}>{user.email}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.transactionView}>
                <View style={styles.transactionContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7EA16B' }}>
                        {logged_in ? '₱150' : '₱0'}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#354D29' }}>
                        Wallet
                    </Text>
                </View>
                <View style={styles.transactionContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7EA16B' }}>
                        {logged_in ? '12' : '0'}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#354D29' }}>
                        Orders
                    </Text>
                </View>
            </View>
            <View style={styles.settings}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 50, backgroundColor: 'white' }}
                >
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? 'gainsboro' : '#ffffff' }
                            , styles.settings_contents]}
                        onPress={logged_in ? favoritesHandler : setShowLoginHandler}
                    >
                        <View style={styles.settings_contents}>
                            <FontAwesome5
                                color={'#FF5714'}
                                size={18}
                                style={styles.settings_contents_margin}
                                name={'heart'}
                            />
                            <Text style={styles.settings_contents_text}>Your Favorites</Text>
                        </View>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? 'gainsboro' : '#ffffff' }
                            , styles.settings_contents]}
                        onPress={() => { ToastAndroid.show('Under Contruction', ToastAndroid.LONG); }}
                    >
                        <View style={styles.settings_contents}>
                            <FontAwesome5
                                color={'#FF5714'}
                                size={18}
                                style={styles.settings_contents_margin}
                                name={'credit-card'}
                            />
                            <Text style={styles.settings_contents_text}>Payments</Text>
                        </View>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? 'gainsboro' : '#ffffff' }
                            , styles.settings_contents]}
                        onPress={() => { ToastAndroid.show('Under Contruction', ToastAndroid.LONG); }}
                    >
                        <View style={styles.settings_contents}>
                            <FontAwesome5
                                color={'#FF5714'}
                                size={18}
                                style={styles.settings_contents_margin}
                                name={'share'}
                            />
                            <Text style={styles.settings_contents_text}>Tell Your Friend</Text>
                        </View>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? 'gainsboro' : '#ffffff' }
                            , styles.settings_contents]}
                        onPress={() => { ToastAndroid.show('Under Contruction', ToastAndroid.LONG); }}
                    >
                        <View style={styles.settings_contents}>
                            <FontAwesome5
                                color={'#FF5714'}
                                size={18}
                                style={styles.settings_contents_margin}
                                name={'user-check'}
                            />
                            <Text style={styles.settings_contents_text}>Support</Text>
                        </View>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? 'gainsboro' : '#ffffff' }
                            , styles.settings_contents]}
                        onPress={() => { ToastAndroid.show('Under Contruction', ToastAndroid.LONG); }}
                    >
                        <View style={styles.settings_contents}>
                            <FontAwesome5
                                color={'#FF5714'}
                                size={18}
                                style={styles.settings_contents_margin}
                                name={'cog'}
                            />
                            <Text style={styles.settings_contents_text}>Settings</Text>
                        </View>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? 'gainsboro' : '#ffffff' }
                            , styles.settings_contents]}
                        onPress={logged_in ? logout : setShowLoginHandler}
                    >
                        <View style={styles.settings_contents}>
                            <FontAwesome5
                                color={'#FF5714'}
                                size={18}
                                style={styles.settings_contents_margin}
                                name={logged_in ? 'sign-out-alt' : 'sign-in-alt'}
                            />
                            <Text style={styles.settings_contents_text}>
                                {logged_in ? 'Logout' : 'Login'}
                            </Text>
                        </View>
                    </Pressable>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#D3F2C2',
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
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 40,
        marginTop: 10,
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 40,
    },
    profileName: {
        marginLeft: 20,
        marginTop: 20,
    },
    username: {
        marginTop: 5,
        fontSize: 11,
        fontFamily: 'Raleway-Light',
        color: '#596F62',
    },
    Icons: {
        marginTop: 20,
        width: '100%',
        height: 100,
        marginLeft: 50,
        flexDirection: 'column',
    },
    label: {
        flex: 1,
        flexDirection: 'row',
    },
    labelText: {
        fontSize: 12,
        marginLeft: 9,
        fontFamily: 'Raleway-Thin',
        color: '#596F62',
    },
    transactionView: {
        flex: 1,
        flexDirection: 'row',
    },
    transactionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#596F62',
    },
    settings: {
        flex: 2,
    },
    settings_contents: {
        height: 70,
        width: '100%',
        flexDirection: 'row',
    },
    settings_contents_margin: {
        marginTop: 20,
        marginLeft: 20,
        height: 30,
        width: 30,
    },
    settings_contents_text: {
        marginTop: 20,
        fontFamily: 'Raleway-Medium',
        marginLeft: 10,
        color: '#354D29',
    },
});
