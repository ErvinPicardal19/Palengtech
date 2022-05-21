/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    RefreshControl,
} from 'react-native';
import Login from './Login.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckoutScreen from './CheckoutScreen.js';
import { ScrollView } from 'react-native-gesture-handler';
import { Item } from 'react-native-paper/lib/typescript/components/List/List.js';

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
        { key: 1, item: 'Item 1' },
        { key: 2, item: 'Item 2' },
        { key: 3, item: 'Item 3' },
        { key: 4, item: 'Item 4' },
        { key: 5, item: 'Item 5' },
        { key: 6, item: 'Item 6' },
        { key: 7, item: 'Item 7' },
        { key: 8, item: 'Item 8' },
        { key: 44, item: 'Item 9' },
        { key: 68, item: 'Item 27' },
        { key: 0, item: 'Item 78' },
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
            <View style={{ width: 50, height: 40 }}>
                <FontAwesome5.Button
                    size={20}
                    name={'shopping-cart'}
                    backgroundColor={'#00000000'}
                    underlayColor={'#00000000'}
                    color={'#76AB5A'}
                    onPress={onPressHandler}
                />
            </View>
            <ScrollView>
                <View>
                    <View style={styles.trending}>
                        <Text style={styles.trendingText}>TRENDING</Text>
                    </View>
                    <FlatList
                        backgroundColor={'#555'}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        data={Items}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.text}>
                                    {item.name}
                                </Text>
                            </View>
                        )}
                    />
                </View>
                {
                    Ingredients.map((object) => {
                        return (
                            <View style={styles.ingredient} key={object.key}>
                                <Text style={styles.text}>{object.item}</Text>
                            </View>
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
    checkout_container: {
        backgroundColor: '#F5F5F5',
        borderRadius: 35,
    },
    checkout_icon: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    center_modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000055',
    },
    item: {
        margin: 10,
        backgroundColor: '#4BBBF2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ingredient: {
        margin: 10,
        backgroundColor: '#76AB5A',
        justifyContent: 'center',
        alignItems: 'center',
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
