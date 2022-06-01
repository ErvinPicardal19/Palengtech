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
    ScrollView,
    SafeAreaView,
    Image,
} from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Container, Header, Icon, Item, Input, Text } from 'native-base';
import SearchBar from 'react-native-dynamic-search-bar';
import CategoryFilter from './CategoryFilter.js';
import ProductList from './ProductList.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckoutScreen from '../../utils/CheckoutScreen.js';
import Carousel from 'react-native-banner-carousel';
// import Animated from 'react-native-reanimated';
import SearchProducts from './SearchProducts.js';

import { useSelector, useDispatch } from 'react-redux';
import { setHideSearch } from '../../redux/actions.js';

const data = require('../../../assets/data/products.json');
const Categories = require('../../../assets/data/category.json');

const bannerImages = [
    'https://pinoytransplantiniowa.files.wordpress.com/2011/05/2641520585_51acd6a7d0.jpg?w=584',
    'https://i0.wp.com/www.astigvegan.com/wp-content/uploads/2019/11/pampanga-public-market.jpg?resize=576%2C576',
    'https://newsinfo.inquirer.net/files/2021/03/Regions134077-620x418.jpg',
];

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;


export default function HomeScreen(props) {

    const { hideSearch } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [Refreshing, setRefreshing] = useState(false);
    // const [hideSearch, setHideSearch] = useState(false);

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(Categories);
        setProductsCtg(data);
        setActive(-1);
        setInitialState(data);

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState([]);
        };
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        // setItems([...Items, { name: 'Item 69' }]);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const toggleSearch = () => {
        dispatch(setHideSearch(!hideSearch));
    };

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


    const onPressHandler = () => {
        setShowCheckout(!showCheckout);
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
                            if (i.category.$oid === ctg.$oid) {
                                return i;
                            }
                        }),
                        setActive(true)
                    ),
                ];
        }
    }

    const Banner = () => {
        return (
            <View>
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
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#D3F2C2',
                padding: 10,
            }}>
                <SearchBar
                    style={{
                        borderWidth: 1,
                        borderColor: '#354D29',
                        width: 290,
                    }}
                    fontColor="#76AB5A"
                    iconColor="#76AB5A"
                    shadowColor="#282828"
                    cancelIconColor="#76AB5A"
                    backgroundColor="#ffffff"
                    placeholder="Maghanap ng Tindahan"
                    onFocus={openList}
                    onChangeText={(text) => searchProduct(text)}
                    // onSearchPress={() => console.log('Search Icon is pressed')}
                    onClearPress={onBlur}
                // onPress={openList}
                />
                <CheckoutScreen
                    showCheckout={showCheckout}
                    setShowCheckout={setShowCheckout}
                />
                <View style={{ marginLeft: 5, width: 55, height: 50, backgroundColor: '#00000000', marginTop: 3 }}>
                    <FontAwesome5.Button
                        size={23}
                        name={'shopping-cart'}
                        backgroundColor={'#00000000'}
                        underlayColor={'#00000000'}
                        color={'#354D29'}
                        onPress={onPressHandler}
                    />
                </View>
            </View>
            {
                focus === true ?
                    <SearchProducts
                        navigation={props.navigation}
                        productsFiltered={productsFiltered}
                    />
                    :
                    <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
                        <FlatList
                            numColumns={2}
                            contentContainerStyle={{ paddingBottom: 150 }}
                            data={productsCtg}
                            renderItem={({ item }) => <ProductList key={item._id}
                                navigation={props.navigation}
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
