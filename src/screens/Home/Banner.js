/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Dimensions,
    ActivityIndicator,
    FlatList,
    Text,
    ScrollView,
    SafeAreaView,
    Image,
} from 'react-native';
import Carousel from 'react-native-banner-carousel';

var { width } = Dimensions.get('window');

const bannerImages = [
    'https://pinoytransplantiniowa.files.wordpress.com/2011/05/2641520585_51acd6a7d0.jpg?w=584',
    'https://i0.wp.com/www.astigvegan.com/wp-content/uploads/2019/11/pampanga-public-market.jpg?resize=576%2C576',
    'https://newsinfo.inquirer.net/files/2021/03/Regions134077-620x418.jpg',
];

export default function Banner() {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData(bannerImages);

        return () => {
            setBannerData([]);
        };

    }, []);


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.carousel}>
                    <Carousel
                        style={{ height: (width / 2) }}
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                    >
                        {
                            bannerData.map((item) => {
                                return (
                                    <Image
                                        key={item}
                                        style={styles.imageBanner}
                                        source={{ uri: item }}
                                    />
                                );
                            })
                        }
                    </Carousel>
                    <View style={{ height: 20 }} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro',
    },
    carousel: {
        width: width,
        alignItems: 'center',
        marginTop: 10,
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20,
    },
});
