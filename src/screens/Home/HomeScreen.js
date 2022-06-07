/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Dimensions,
    RefreshControl,
    FlatList,
    Text,
    ImageBackground,
    SafeAreaView,
    Image,
    Animated,
} from 'react-native';



import SearchBar from 'react-native-dynamic-search-bar';
import CategoryFilter from './CategoryFilter.js';
import StoreList from './StoreList.js';

import Carousel from 'react-native-banner-carousel';

import SearchProducts from './SearchProducts.js';

import { useSelector, useDispatch } from 'react-redux';
import { setHideSearch } from '../../redux/actions/actions.js';
import Header from '../../shared/Header.js';

import baseUrl from '../../../assets/common/baseUrl.js';
import axios from 'axios';
import SQLite from 'react-native-sqlite-storage';
import { setUser, setLogged_in } from '../../redux/actions/actions.js';
import Login from '../../utils/Login.js';

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    (error) => { console.log(error); }
);

// const data = require('../../../assets/data/shop.json');
const Categories = require('../../../assets/data/category.json');

const bannerImages = [
    'https://pinoytransplantiniowa.files.wordpress.com/2011/05/2641520585_51acd6a7d0.jpg?w=584',
    'https://i0.wp.com/www.astigvegan.com/wp-content/uploads/2019/11/pampanga-public-market.jpg?resize=576%2C576',
    'https://newsinfo.inquirer.net/files/2021/03/Regions134077-620x418.jpg',
];

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;


export default function HomeScreen({ navigation }) {

    const { hideSearch, logged_in } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [Refreshing, setRefreshing] = useState(false);
    const [pos, setPos] = useState(0);
    const [showLogin, setShowLogin] = useState(false);
    // const [hideSearch, setHideSearch] = useState(false);

    useEffect(() => {
        setFocus(false);
        setCategories(Categories);
        setActive(-1);
        getInfo();

        axios
            .get(`${baseUrl}/shop`)
            .then((res) => {
                setProducts(res.data);
                setProductsFiltered(res.data);
                setProductsCtg(res.data);
                setInitialState(res.data);
            });

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState([]);
        };
    }, []);

    const getInfo = () => {
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

    const onRefresh = () => {
        setRefreshing(true);
        // setItems([...Items, { name: 'Item 69' }]);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    // const toggleSearch = () => {
    //     dispatch(setHideSearch(true));
    // };

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    const checkPos = (currentPos) => {
        let x = currentPos;
        // console.log(x);
        if (x >= 250) {
            dispatch(setHideSearch(true));
        }
        else if (x <= 50) {
            // console.log('Scrolling Down');
            dispatch(setHideSearch(false));
        }
        setPos(currentPos);
    };

    // Categories
    const changeCtg = (ctg) => {
        {
            ctg === 'all' ?
                [setProductsCtg(initialState), setActive(true)]
                :
                [
                    setProductsCtg(
                        products.filter((i) => {
                            // console.log('Category_ID:' + i.category.$oid + '\tCtg:' + ctg.$oid);
                            if (i.category.categoryID === ctg.$oid) {
                                return i;
                            }
                        }),
                    ), setActive(true),
                ];
        }
        // console.log(productsCtg);
    };

    const setShowLoginHandler = () => {
        setShowLogin(!showLogin);
    };


    const Banner = () => {
        return (
            <View>
                <Login
                    showLogin={showLogin}
                    setShowLoginHandler={setShowLoginHandler}
                    logged_in={logged_in}
                />
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {
                        bannerImages.map((image, index) => {
                            return (
                                <View key={index}>
                                    <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
                                </View>
                            );
                        })
                    }
                </Carousel>
                <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                />
            </View>
        );
    };

    return (
        <View style={{ backgroundColor: 'transparent' }}>
            {/* <ImageBackground
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHy09JUSZGoQfZ30g9d_WMUwmaC5dCAKQbn59gPeKo-jpUlNTsH4PrC2ZfxHNC_iZr5bk&usqp=CAU' }}
                resizeMode="cover"
            > */}
            {
                focus ? null : <Header name={'Home'} navigation={navigation} hide={false} />
            }
            {
                hideSearch ?
                    null
                    :
                    <View
                        style={[
                            {
                                flexDirection: 'row',
                                padding: 10,
                            },
                        ]}
                    >
                        <SearchBar
                            style={focus ? {
                                backgroundColor: 'white',
                                height: 35,
                            } : {
                                backgroundColor: '#C6C6C6',
                                height: 35,
                            }
                            }
                            fontSize={13}
                            padding={0}
                            placeholderTextColor={'#62626299'}
                            iconColor="transparent"
                            shadowColor="#282828"
                            cancelIconColor={'#959595'}
                            clearIconContainer={{ color: '#959595' }}
                            searchIconImageStyle={'#D3F2C2'}
                            placeholder="Maghanap ng Tindahan"
                            onFocus={openList}
                            onChangeText={(text) => {
                                searchProduct(text);
                                openList();
                            }}
                            // onSearchPress={() => console.log('Search Icon is pressed')}
                            onClearPress={onBlur}
                            onPress={openList}
                        />
                    </View>
            }
            {/* </ImageBackground> */}
            {
                focus === true ?
                    <SearchProducts
                        navigation={navigation}
                        productsFiltered={productsFiltered}
                    />
                    :
                    <SafeAreaView style={{ backgroundColor: '#f2f2f2' }}>
                        <FlatList
                            onScroll={(e) => checkPos(e.nativeEvent.contentOffset.y)}
                            // numColumns={2}
                            contentContainerStyle={{ paddingBottom: 250 }}
                            data={productsCtg}
                            renderItem={({ item }) => <StoreList key={item._id}
                                navigation={navigation}
                                item={item}
                            />
                            }
                            keyExtractor={(item, index) => item.description}
                            ListHeaderComponent={Banner}
                            refreshControl={
                                <RefreshControl
                                    refreshing={Refreshing}
                                    onRefresh={onRefresh}
                                    colors={['#354D29']}
                                />
                            }
                        />
                    </SafeAreaView>
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
    text: {
        color: '#354D29',
        margin: 10,
        fontSize: 20,
    },
    slideButton: {
        width: '100%',
        backgroundColor: '#76AB5A',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
