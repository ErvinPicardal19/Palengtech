/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
export const SET_HIDE_SEARCH = 'SET_HIDE_SEARCH';
export const SET_PROFILE_PIC = 'SET_PROFILE_PIC';
export const SET_LOG_IN = 'SET_LOG_IN';
export const SET_CHECKOUT = 'SET_CHECKOUT';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_USER = 'SET_USER';


export const setHideSearch = hideSearch => dispatch => {
    dispatch({
        type: SET_HIDE_SEARCH,
        payload: hideSearch,
    });
};

export const setUser = user => dispatch => {
    dispatch({
        type: SET_USER,
        payload: user,
    });
};

export const setProfile = profile => dispatch => {
    dispatch({
        type: SET_PROFILE_PIC,
        payload: profile,
    });
};

export const setLogged_in = logged_in => dispatch => {
    dispatch({
        type: SET_LOG_IN,
        payload: logged_in,
    });
};

export const setShowCheckout = showCheckout => dispatch => {
    dispatch({
        type: SET_CHECKOUT,
        payload: showCheckout,
    });
};

export const setTotal = total => dispatch => {
    dispatch({
        type: SET_TOTAL,
        payload: total,
    });
};
