/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    Image,
    View,
    StyleSheet,
    Text,
    ScrollView,
    Button,
    Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

var { width } = Dimensions.get('window');

export default function SingleProduct(props) {

    const [checkoutPressed, setCheckOutPressed] = useState(false);
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginBottom: 80 }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.image ? item.image : 'https://pngimg.com/uploads/box/box_PNG49.png' }}
                        style={styles.image}
                    />
                    <View
                        style={styles.filter}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentHeader}>{item.name}</Text>
                    {/* <Text style={styles.contentText}>{item.description}</Text> */}
                </View>

            </ScrollView>
            <View style={styles.bottomContainer}>
                <Text style={styles.price}>₱{item.price}</Text>
                <View style={styles.checkoutButton}>
                    <TouchableOpacity>
                        <Text style={{ color: '#48B9F1' }}>CHECKOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
        backgroundColor: 'white',
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0,
    },
    image: {
        width: '100%',
        height: 250,
    },
    filter: {
        backgroundColor: '#00000055',
        width: '100%',
        height: 250,
        position: 'absolute',
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    bottomContainer: {
        width: '100%',
        paddingBottom: 80,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'gainsboro',
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: '#354D29',
    },
    checkoutButton: {

        justifyContent: 'center',
        marginLeft: (width / 2) - 10,
    },
    contentHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
