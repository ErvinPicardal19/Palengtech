/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_PROFILE_PIC = 'SET_PROFILE_PIC';
export const SET_LOG_IN = 'SET_LOG_IN';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';

export const setName = name => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        payload: name,
    });
};

export const setEmail = email => dispatch => {
    dispatch({
        type: SET_EMAIL,
        payload: email,
    });
};

export const setPassword = pwd => dispatch => {
    dispatch({
        type: SET_PASSWORD,
        payload: pwd,
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