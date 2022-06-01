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
} from 'react-native';

export default function SingleProduct(props) {
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.image ? item.image : 'https://pngimg.com/uploads/box/box_PNG49.png' }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentHeader}>{item.name}</Text>
                    <Text style={styles.contentText}>{item.description}</Text>
                </View>
                {/* TODO: Description, Rich Desciption and Availability */}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Text style={styles.price}>₱{item.price}</Text>
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
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red',
    },
});
