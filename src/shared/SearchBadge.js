/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { StyleSheet, Image, SafeAreaView, View, Text, Dimensions } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconBadge from 'react-native-icon-badge';

const width = Dimensions.get('window').width;

export default function SearchBadge(props) {

    const [badgeCount, setBadgeCount] = useState(0);
    return (
        <IconBadge
            MainElement={
                <MaterialIcon.Button
                    size={25}
                    name={'heart'}
                    backgroundColor={'transparent'}
                    underlayColor={'transparent'}
                    color={'white'}
                    onPress={props.favorites}
                    padding={0}
                />
            }
            BadgeElement={
                <Text style={{ color: '#FFFFFF', fontSize: 10 }}>{badgeCount}</Text>
            }
            IconBadgeStyle={
                {
                    left: 0,
                    marginTop: 17,
                    width: 15,
                    height: 20,
                    backgroundColor: 'red',
                }
            }
            Hidden={badgeCount === 0}
        />
    )
}