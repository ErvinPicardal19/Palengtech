/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button,
} from 'react-native';

var { width } = Dimensions.get('window');

export default function ProductCard(props) {
    const { name, description, image, countInStock } = props;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: image }}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.card} />
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
            </Text>
            <Text style={styles.description}>TULOY PO KAYO!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20 - 10,
        height: width / 1.7,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 13,
        padding: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: '#D3F2C2',
    },
    image: {
        width: (width / 2) - 20 - 10,
        height: (width / 2) - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45,
    },
    card: {
        marginBottom: 10,
        height: (width / 2) - 20 - 90,
        backgroundColor: 'transparent',
        width: '100%',
        borderRadius: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Raleway-Bold',
    },
    description: {
        fontSize: 12,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: '#354D29',
        color: 'white',
        padding: 10,
        borderRadius: 10,
    },
});
