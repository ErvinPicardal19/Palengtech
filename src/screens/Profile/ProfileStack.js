/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    ToastAndroid,
} from 'react-native';
// import Login from '../../utils/Login.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SQLite from 'react-native-sqlite-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
// import { AuthContext } from '../../context/AuthContext.js';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setLogged_in } from '../../redux/actions/actions.js';

// const db = SQLite.openDatabase(
//     {
//         name: 'MainDB',
//         location: 'default',
//     },
//     () => { },
//     (error) => { console.log(error); }
// );

export default function ProfileStack({ navigation }) {

    const authContext = useContext(AuthContext);
    const { authAxios } = useContext(AxiosContext);

    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        await AsyncStorage.getItem('user').then(async (uid) => {
            await authAxios.get(`/user/${uid}`).then((res) => {
                dispatch(setUser(res.data))
            })
        })
    }

    const logout = () => {
        try {
            authContext.logout();
            // });
        } catch (err) {
            console.log(err);
        }
    };

    const favoritesHandler = () => {
        navigation.navigate('Favorites');
    };
    console.log(user.profilePic)
    return (
        <View style={styles.body}>
            {/* <Login
                showLogin={showLogin}
                setShowLoginHandler={setShowLoginHandler}
                user={user}
            /> */}
            <View style={{ backgroundColor: '#D3F2C2', marginTop: 10 }}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profile}
                        source={user ? { uri: user.profilePic } : require('../../../assets/DefaultProfile.png')}
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
                                {user ? `+63${user.phone}` : null}
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
                        {user ? '₱150' : '₱0'}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#354D29' }}>
                        Wallet
                    </Text>
                </View>
                <View style={styles.transactionContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7EA16B' }}>
                        {user ? '12' : '0'}
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
                        onPress={user ? favoritesHandler : setShowLoginHandler}
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
                        onPress={user ? logout : setShowLoginHandler}
                    >
                        <View style={styles.settings_contents}>
                            <FontAwesome5
                                color={'#FF5714'}
                                size={18}
                                style={styles.settings_contents_margin}
                                name={user ? 'sign-out-alt' : 'sign-in-alt'}
                            />
                            <Text style={styles.settings_contents_text}>
                                {user ? 'Logout' : 'Login'}
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
