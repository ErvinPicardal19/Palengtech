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
} from 'react-native';
import Login from '../utils/Login.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import { useSelector, useDispatch } from 'react-redux';
// import { setEmail, setPassword } from '../redux/actions.js';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    (error) => { console.log(error); }
);

export default function ProfileScreen() {

    // const { email, pwd } = useSelector(state => state.userReducer);
    // const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [logged_in, setLogged_in] = useState(false);

    useEffect(() => {
        getData();
    }, [logged_in]);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS '
                + 'Users '
                + '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Profile TEXT);'
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
                    'SELECT Name, Profile FROM Users',
                    [],
                    (_tx, results) => {
                        console.log(results.rows.item(0));
                        var len = results.rows.length;
                        if (len > 0) {
                            var userName = results.rows.item(0).Name;
                            var profilePic = results.rows.item(0).Profile;
                            console.log(userName, profilePic);
                            setName(userName);
                            setProfile(profilePic);
                            setLogged_in(true);
                            setShowLogin(false);
                        } else {
                            // setLogged_in(false);
                            // setShowLogin(true);
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
                setLogged_in(false);
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={styles.body}>
            <Login
                showLogin={showLogin}
                setShowLoginHandler={setShowLoginHandler}
                setLogged_in={setLogged_in}
                setName={setName}
                setProfile={setProfile}
            />
            <View style={styles.profileContainer}>
                {
                    logged_in ?
                        <Image
                            style={styles.profile}
                            source={profile}
                        />
                        :
                        <Image
                            style={styles.profile}
                            source={require('../../assets/DefaultProfile.png')}
                        />
                }
                <View style={styles.profileName}>
                    <Text
                        style={{ color: '#000000', fontWeight: 'bold', fontSize: 20 }}
                    >
                        Ervin Picardal
                    </Text>
                    <Text style={styles.username}>@EJPicardal</Text>
                </View>
            </View>
            <View>
                <View style={styles.Icons}>
                    <View>
                        <FontAwesome5
                            size={15}
                            style={styles.location}
                            name={'map-marked'}
                        />
                    </View>
                    <View>
                        <FontAwesome5
                            size={15}
                            style={styles.location}
                            name={'phone'}
                        />
                    </View>
                    <View>
                        <FontAwesome5
                            size={15}
                            style={styles.location}
                            name={'envelope'}
                        />
                    </View>
                </View>
                <View>
                    <Text>Antipolo City</Text>
                    <Text>+09063776319</Text>
                    <Text>ervinjohnpicardal@gmail.com</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        marginTop: 50,
    },
    profile: {
        width: 90,
        height: 90,
    },
    profileName: {
        marginLeft: 20,
        marginTop: 20,
    },
    username: {
        fontSize: 11,
    },
    Icons: {
        width: '100%',
        height: 150,
        marginLeft: 50,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
});
