/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
} from 'react-native';

export default function CategoryFilter(props) {

    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
            style={{ backgroundColor: '#f2f2f2', padding: 10, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
        >
            <TouchableOpacity
                key={1}
                onPress={() => {
                    props.categoryFilter('all');
                    props.setActive(-1);
                }}
            >
                <Text style={[styles.center, { margin: 5 },
                props.active === -1 ? styles.active : styles.inactive]}
                >
                    All
                </Text>
            </TouchableOpacity>
            {props.categories.map((item) => (
                <TouchableOpacity
                    key={item._id.$oid}
                    onPress={() => {
                        props.categoryFilter(item._id);
                        props.setActive(props.categories.indexOf(item));
                    }}
                >
                    <Text style={[styles.center, { margin: 5 },
                    props.active === props.categories.indexOf(item) ? styles.active : styles.inactive]}
                    >
                        {item.description}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
    },
    active: {
        backgroundColor: '#354D29',
    },
    inactive: {
        backgroundColor: '#D3F2C2',
        color: '#76AB5A55',
    },
});
