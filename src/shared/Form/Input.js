/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default function Input(props) {
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Raleway-Regular' }}>{props.name}:</Text>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                name={props.name}
                id={props.id}
                value={props.value}
                autoCorrect={props.autoCorrect}
                onChangeText={props.onChangeText}
                onFocus={props.onFocus}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.keyboardType}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        margin: 10,
    },
    input: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: '#76AB5A',
        elevation: 8,
    },
});