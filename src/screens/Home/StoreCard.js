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
    ImageBackground,
} from 'react-native';

var { width } = Dimensions.get('window');

export default function StoreCard(props) {
    const { name, description, image, countInStock, address } = props;

    return (
        <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 15, paddingBottom: 20, elevation: 8 }}>
            <ImageBackground
                source={{ uri: image }}
                style={styles.container}
                borderTopLeftRadius={15}
                borderTopRightRadius={15}
                backgroundColor={'transparent'}
            >
                {/* <View style={styles.card} /> */}
            </ImageBackground>
            <View style={{ padding: 10 }}>
                <Text style={styles.title}>
                    {name}
                </Text>
                <Text style={styles.address}>
                    {address}
                </Text>
            </View>
            {/* <Text style={styles.description}>TULOY PO KAYO!</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: width / 1.7,
        borderRadius: 5,
        marginBottom: 5,
        alignItems: 'center',
        backgroundColor: 'transparent',
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
        fontFamily: 'Raleway-Bold',
        color: 'black',
    },
    address: {
        fontSize: 12,
        marginTop: 10,
        color: '#555',
        opacity: 0.5,
    },
});
