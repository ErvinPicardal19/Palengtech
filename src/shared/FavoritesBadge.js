/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { StyleSheet, Image, SafeAreaView, View, Text, Dimensions } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconBadge from 'react-native-icon-badge';

const width = Dimensions.get('window').width;

export default function FavoritesBadge(props) {

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
                    left: 0,
                    marginTop: 17,
                    width: 15,
                    height: 20,
                    backgroundColor: 'red',
                }
            }
            Hidden={badgeCount === 0}
        />
    );
}

