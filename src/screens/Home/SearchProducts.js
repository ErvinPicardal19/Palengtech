/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
// import { ListItem, Content, Left, Thumbnail, Text, Body } from 'native-base';
import React from 'react';
import { View, StyleSheet, FlatList, Image, Text } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
// import { FlatList } from 'react-native-gesture-handler';
// import { Item } from 'react-native-paper/lib/typescript/components/List/List';

export default function SearchProducts(props) {
    const { productsFiltered } = props;

    return (
        <View style={{ width: '100%' }}>
            {
                productsFiltered.length > 0 ?
                    <FlatList
                        // onScroll={ }
                        // numColumns={2}
                        // contentContainerStyle={{ paddingBottom: 150 }}
                        data={productsFiltered}
                        renderItem={({ item }) =>
                            <Pressable
                                onPress={() => props.navigation.navigate('Product', { item: item })}
                                style={({ pressed }) => [
                                    { backgroundColor: pressed ? '#76AB5A' : '#ffffff' }
                                    , styles.center]}
                            >
                                <View>
                                    <Image
                                        source={{ uri: item.image }}
                                    />
                                    <Text style={styles.textContainer}>{item.name}</Text>
                                </View>
                            </Pressable>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                    :
                    <View style={styles.notFound}>
                        <Text>
                            Store does not exist
                        </Text>
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    notFound: {
        width: '100%',
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    textContainer: {
        padding: 10,
    },
});


