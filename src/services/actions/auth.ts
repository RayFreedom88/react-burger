import {
    postLoginRequest,
    postLogoutRequest,
    postUpdateTokenRequest,
    getUserRequest,
    patchUpdateUser,
    postRegisterRequest,
    postForgotPasswordRequest,
    postResetPasswordRequest
} from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk } from '../types';
import { TUser } from '../types/types';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const UPDATE_TOKEN_REQUEST: 'TOKEN_REQUEST' = 'TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS: 'TOKEN_SUCCESS' = 'TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED: 'TOKEN_FAILED' = 'TOKEN_FAILED';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

// LOGIN INTERFACE
export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: TUser;
}

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

// LOGOUT INTERFACE
export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

// UPDATE_TOKEN INTERFACE
export interface IUpdateTokenRequestAction {
    readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccessAction {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface IUpdateTokenFailedAction {
    readonly type: typeof UPDATE_TOKEN_FAILED;
}

// GET_USER INTERFACE
export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: TUser;
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

// UPDATE_USER INTERFACE
export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly user: TUser;
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

// REGISTER INTERFACE
export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: TUser;
}

export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

// FORGOT_PASSWORD INTERFACE
export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

// RESET_PASSWORD INTERFACE
export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

// TYPE AUTH
export type TAuthActions =
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IUpdateTokenRequestAction
    | IUpdateTokenSuccessAction
    | IUpdateTokenFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction;

export const logIn: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
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

export const logOut: AppThunk = () => (dispatch: AppDispatch) => {
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

export const updateToken: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_TOKEN_REQUEST });

    postUpdateTokenRequest()
        .then((res) => {
            const accessToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;

            setCookie('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            if (res && res.success) {
                dispatch({
                    type: UPDATE_TOKEN_SUCCESS
                });
            } else {
                dispatch({
                    type: UPDATE_TOKEN_FAILED
                });
            }
        })
        .catch(() => {
            dispatch({
                type: UPDATE_TOKEN_FAILED
            })
        });
};

export const getUser: AppThunk = () => (dispatch) => {
    dispatch({
        type: GET_USER_REQUEST
    });

    getUserRequest()
        .then((res) => {
            if (res.success) {
                dispatch({
                    type: GET_USER_SUCCESS,
                    user: res.user
                });
            }
        })
        .catch((err) => {
            if ((err.message === 'jwt expired') || (err.message === 'Token is invalid')) {
                dispatch(updateToken());
                dispatch(getUser());
            } else {
                console.log(err.message);
                dispatch({
                    type: GET_USER_FAILED
                })
            }
        });
}

export const updateUser: AppThunk = (email: string, name: string) => (dispatch) => {
    dispatch({
        type: UPDATE_USER_REQUEST
    });

    patchUpdateUser(email, name)
        .then((res) => {
            if (res.success) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: res.user
                });
            }
        })
        .catch((err) => {
            if (err.message === 'Token is invalid') {
                dispatch(updateToken());
                // dispatch(updateUser(email, name));
            } else {
                dispatch({
                    type: UPDATE_USER_FAILED
                })
            }
        });
}

export const register: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
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
};

export const forgotPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
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

export const resetPassword: AppThunk = (password: string, token: string) => (dispatch: AppDispatch) => {
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
};
