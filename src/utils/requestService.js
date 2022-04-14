import axios from "axios";

import {useDispatch} from "react-redux";

import {TokenService} from "..";

import {deleteUserData} from "../../../Accounts/actions";

const requestService = axios.create({
    baseURL: process.env.REACT_APP_API_ENTRYPOINT,
});

requestService.interceptors.request.use(
    (config) => {
        const token = TokenService.getAccessToken();
        if (token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

requestService.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        const valid = TokenService.getRefreshTokenValidity();
        // if refresh token is expired, redirect user to login with action
        if (!valid) {
            useDispatch(deleteUserData());
        }

        if (error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            return requestService({
                url: "/api/v1/accounts/token/refresh/",
                method: "post",
                data: {
                    refresh: TokenService.getRefreshToken(),
                },
            }).then((res) => {
                if (res.status === 200) {
                    TokenService.setToken(res.data);

                    requestService.defaults.headers.common.Authorization = `Bearer ${TokenService.getAccessToken()}`;

                    return requestService(originalRequest);
                }
                return null;
            });
        }
        return Promise.reject(error);
    },
);

export default requestService;