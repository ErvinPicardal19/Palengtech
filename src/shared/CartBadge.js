/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { StyleSheet, Image, SafeAreaView, View, Text, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconBadge from 'react-native-icon-badge';

const width = Dimensions.get('window').width;

export default function CartBadge(props) {

    const [badgeCount, setBadgeCount] = useState(3);

    return (
        <IconBadge
            MainElement={
                <FontAwesome5.Button
                    size={20}
                    name={'shopping-basket'}
                    backgroundColor={'transparent'}
                    underlayColor={'#00000000'}
                    color={'white'}
                    onPress={props.toggleCheckout}
                    paddingRight={3}
                    paddingLeft={3}
                    paddingTop={2}
                    paddingBottom={2}
                />
            }
            BadgeElement={
                <Text style={{ color: '#FFFFFF', fontSize: 10 }}>{badgeCount}</Text>
            }
            IconBadgeStyle={
                {
                    left: -10,
                    marginTop: 10,
                    width: 15,
                    height: 20,
                    backgroundColor: 'red',
                }
            }
            Hidden={badgeCount === 0}
        />
    );
}
