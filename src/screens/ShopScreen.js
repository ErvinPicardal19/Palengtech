/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    RefreshControl,
    ScrollView,
    ImageBackground,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckoutScreen from './CheckoutScreen.js';

export default function ShopScreen() {

    const [showCheckout, setShowCheckout] = useState(false);

    //Pag Testing lang
    const [Items, setItems] = useState([
        { name: 'Shop 1' },
        { name: 'Shop 2' },
        { name: 'Shop 3' },
        { name: 'Shop 4' },
        { name: 'Shop 5' },
        { name: 'Shop 6' },
        { name: 'Shop 7' },
        { name: 'Shop 8' },
        { name: 'Shop 9' },
        { name: 'Shop 10' },
        { name: 'Shop 11' },
    ]);

    //Pag Testing lang
    const [Ingredients, setIngredients] = useState([
        { key: 1, category: 'Poultry', src: 'https://www.kemin.com/content/dam/kft/food-technologies-asia-pacific/Shelf-Life-Extension-For-Meat-&-Poultry.jpg' },
        { key: 2, category: 'Seafood', src: 'https://www.tasteofhome.com/wp-content/uploads/2018/08/shutterstock_96851353.jpg' },
        { key: 3, category: 'Fruits', src: 'https://www.afproduce.com/wp-content/uploads/2018/08/fruits1.jpg' },
        { key: 4, category: 'Vegetables', src: 'https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg' },
    ]);

    const onPressHandler = () => {
        setShowCheckout(!showCheckout);
    };

    return (
        <View>
            <CheckoutScreen
                showCheckout={showCheckout}
                setShowCheckout={setShowCheckout}
            />
            <View style={{ width: 50, height: 40, backgroundColor: '#00000000' }}>
                <FontAwesome5.Button
                    size={20}
                    name={'shopping-cart'}
                    backgroundColor={'#00000000'}
                    underlayColor={'#00000000'}
                    color={'#76AB5A'}
                    onPress={onPressHandler}
                />
            </View>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                scrollEventThrottle={1000}
            >
                {
                    Ingredients.map((object) => {
                        return (
                            <Pressable
                                style={({ pressed }) => [
                                    { opacity: pressed ? 0.5 : 1.0 }
                                    , styles.ingredient_container]}
                                key={object.key}>
                                <ImageBackground
                                    style={{ height: 200, width: '100%', justifyContent: 'center', alignItems: 'center' }}
                                    source={{ uri: object.src }}
                                >
                                    <View style={styles.ingredient_label}>
                                        <Text style={{ fontFamily: 'Raleway-Regular', fontSize: 50, color: '#D3F2C2' }}> {object.category} </Text>
                                    </View>
                                </ImageBackground>
                            </Pressable>
                        );
                    })
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        backgroundColor: '#000000',
    },
    item: {
        margin: 10,
        backgroundColor: '#4BBBF2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ingredient_container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ingredient_label: {
        height: '100%',
        width: '100%',
        backgroundColor: '#00000077',
        alignItems: 'center',
        justifyContent: 'center',
    },
    trending: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    trendingText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
    },
    text: {
        color: '#000000',
        fontSize: 45,
        margin: 10,
    },
});
