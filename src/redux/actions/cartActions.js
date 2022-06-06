/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const NEW_RENDER = 'NEW_RENDER';

export const addToCart = item => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: item,
    });
};

export const removeFromCart = item => dispatch => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: item,
    });
};

export const clearCart = () => dispatch => {
    dispatch({
        type: CLEAR_CART,
    });
};

export const newRender = () => dispatch => {
    dispatch({
        type: NEW_RENDER,
    });
};
