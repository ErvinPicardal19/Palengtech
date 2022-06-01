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
    ScrollView,
    ImageBackground,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckoutScreen from '../../utils/CheckoutScreen.js';
import SearchBar from 'react-native-dynamic-search-bar';

export default function ShopStack({ navigation }) {


    //Pag Testing lang
    const [Ingredients, setIngredients] = useState([
        { key: 1, category: 'MEAT', src: 'https://www.kemin.com/content/dam/kft/food-technologies-asia-pacific/Shelf-Life-Extension-For-Meat-&-Poultry.jpg', navigate: 'Poultry' },
        { key: 2, category: 'SEAFOOD', src: 'https://www.tasteofhome.com/wp-content/uploads/2018/08/shutterstock_96851353.jpg' },
        { key: 3, category: 'FRUITS', src: 'https://www.afproduce.com/wp-content/uploads/2018/08/fruits1.jpg' },
        { key: 4, category: 'VEGETABLES', src: 'https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg' },
    ]);

    const [showCheckout, setShowCheckout] = useState(false);

    const onPressHandler = () => {
        setShowCheckout(!showCheckout);
    };


    return (
        <View>
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#D3F2C2',
                padding: 10,
            }}>
                <SearchBar
                    style={{
                        borderWidth: 1,
                        borderColor: '#354D29',
                    }}
                    fontColor="#76AB5A"
                    iconColor="#76AB5A"
                    shadowColor="#282828"
                    cancelIconColor="#76AB5A"
                    backgroundColor="#ffffff"
                    darkMode={false}
                    placeholder="Search here"
                    // onChangeText={(text) => this.filterList(text)}
                    onSearchPress={() => console.log('Search Icon is pressed')}
                    // onClearPress={() => this.filterList('')}
                    onPress={() => console.log('onPress')}
                />
                <CheckoutScreen
                    showCheckout={showCheckout}
                    setShowCheckout={setShowCheckout}
                />
                <View style={{ width: 55, height: 50, backgroundColor: '#00000000', marginTop: 3 }}>
                    <FontAwesome5.Button
                        size={23}
                        name={'shopping-cart'}
                        backgroundColor={'#00000000'}
                        underlayColor={'#00000000'}
                        color={'#354D29'}
                        style={styles.checkout}
                        onPress={onPressHandler}
                    />
                </View>
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 72 }}
                scrollEventThrottle={1000}
            >
                {
                    Ingredients.map((object) => {
                        return (
                            <Pressable
                                style={({ pressed }) => [
                                    { opacity: pressed ? 0.5 : 1.0 }
                                    , styles.ingredient_container]}
                                key={object.key}
                                onPress={() => navigation.navigate(object.navigate)}
                            >
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
