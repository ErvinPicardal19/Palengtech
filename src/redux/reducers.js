/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    SET_USER_NAME,
    SET_PROFILE_PIC,
    SET_LOG_IN, SET_EMAIL, SET_PASSWORD
} from './actions.js';

const initialState = {
    name: '',
    profile: '',
    logged_in: false,
    email: '',
    pwd: '',
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, name: action.payload };
        case SET_PROFILE_PIC:
            return { ...state, profile: action.payload };
        case SET_LOG_IN:
            return { ...state, logged_in: action.payload };
        case SET_EMAIL:
            return { ...state, email: action.payload };
        case SET_PASSWORD:
            return { ...state, pwd: action.payload };
        default:
            return { ...state };
    }
}



export default userReducer;
