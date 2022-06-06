/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    NEW_RENDER,
} from '../actions/cartActions.js';

const initialState = {
    cart: [],
};

function cartItems(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, cart: [...state.cart, action.payload] };
        case REMOVE_FROM_CART:
            return { ...state, cart: state.cart.filter(cartItem => cartItem !== action.payload) };
        case CLEAR_CART:
            return { ...state, cart: [] };
        case NEW_RENDER:
            return state;
        default:
            return state;
    }
}

export default cartItems;
