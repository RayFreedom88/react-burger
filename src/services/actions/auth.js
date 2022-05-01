import {
    postLoginRequest,
    postLogoutRequest,
    postRegisterRequest,
    postForgotPasswordRequest,
    postResetPasswordRequest
} from '../../api/api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export function logIn(email, password) {

    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });

        postLoginRequest(email, password)
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;

                setCookie('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                if (res.success) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: res.user
                    });
                } else {
                    dispatch({
                        type: LOGIN_FAILED
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_FAILED
                })
            });
    }
}

export function logOut() {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        });

        postLogoutRequest()
            .then((res) => {
                if (res.success) {
                    localStorage.removeItem('refreshToken');
                    deleteCookie('token');
                    
                    dispatch({
                        type: LOGOUT_SUCCESS
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: LOGIN_FAILED
                })
            });
    }
}

export function register(email, password, name) {

    return function (dispatch) {
        dispatch({
            type: REGISTER_FAILED
        });

        postRegisterRequest(email, password, name)
            .then((res) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;

                setCookie('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                if (res && res.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: res.user
                    });
                } else {
                    dispatch({
                        type: REGISTER_FAILED
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: REGISTER_FAILED
                })
            );
    }
};

export function forgotPassword(email) {

    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });

        postForgotPasswordRequest(email)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS
                    });
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILED
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: FORGOT_PASSWORD_FAILED
                })
            );
    };
}

export function resetPassword(password, token) {

    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });

        postResetPasswordRequest(password, token)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: RESET_PASSWORD_FAILED
                })
            });
    }
}
