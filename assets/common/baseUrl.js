/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { Platform } from 'react-native';

let baseUrl = '';

{
    Platform.OS === 'android' ?
        baseUrl = 'http://192.168.1.57:5000/api/v1'
        :
        baseUrl = 'http://localhost:5000/api/v1';
}

export default baseUrl;
