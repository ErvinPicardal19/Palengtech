/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/reducers.js';
import cartItems from './reducers/cartItems.js';

const rootReducer = combineReducers({
    userReducer,
    cartItems,
});


export const Store = createStore(rootReducer, applyMiddleware(thunk));

