/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_HIDE_SEARCH,
    SET_LOG_IN,
    SET_CHECKOUT,
    SET_TOTAL,
    SET_USER,
} from '../actions/actions.js';

const initialState = {
    name: '',
    profile: '',
    logged_in: false,
    hideSearch: false,
    showCheckout: 'false',
    total: 0,
    user: {
        name: '',
        profile: '',
        username: '',
        email: '',
        phone: null,
        location: '',
    },
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_HIDE_SEARCH:
            return { ...state, hideSearch: action.payload };
        case SET_LOG_IN:
            return { ...state, logged_in: action.payload };
        case SET_CHECKOUT:
            return { ...state, showCheckout: action.payload };
        case SET_TOTAL:
            return { ...state, total: action.payload };
        case SET_USER:
            return { ...state, user: action.payload };
        default:
            return { ...state };
    }
}

