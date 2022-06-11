import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
    const authContext = useContext(AuthContext);

    const authAxios = axios.create({
        baseURL: 'https://palengtech-server.herokuapp.com/api/v1',
    });

    const publicAxios = axios.create({
        baseURL: 'https://palengtech-server.herokuapp.com',
    });

    authAxios.interceptors.request.use(
        config => {
            if (!config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
                // console.log(config.headers.Authorization);
            }

            return config;
        },
        error => {
            console.log(error);
            return Promise.reject(error);
        },
    );

    const refreshAuthLogic = async failedRequest => {
        const data = {
            refreshToken: authContext.authState.refreshToken,
        };

        const options = {
            method: 'POST',
            data,
            url: 'https://palengtech-server.herokuapp.com/refresh',
        };
        console.log('Getting Refresh Token');
        return axios(options)
            .then(async tokenRefreshResponse => {


                failedRequest.response.config.headers.Authorization =
                    'Bearer ' + tokenRefreshResponse.data.accessToken;

                authContext.setAuthState({
                    ...authContext.authState,
                    accessToken: tokenRefreshResponse.data.accessToken,
                });

                await Keychain.setGenericPassword(
                    'token',
                    JSON.stringify({
                        accessToken: tokenRefreshResponse.data.accessToken,
                        refreshToken: authContext.authState.refreshToken,
                    }),
                );

                return Promise.resolve();
            })
            .catch(e => {
                authContext.setAuthState({
                    accessToken: null,
                    refreshToken: null,
                });
            });
    };

    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

    return (
        <Provider
            value={{
                authAxios,
                publicAxios,
            }}>
            {children}
        </Provider>
    );
};

export { AxiosContext, AxiosProvider };