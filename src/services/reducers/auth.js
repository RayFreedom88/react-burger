import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from '../actions/auth';

const initialState = {
    user: {
        name: '',
        email: '',
        password: ''
    },

    loggedIn: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    registerRequest: false,
    registerFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {

            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            };
        }

        case LOGIN_SUCCESS: {

            return {
                ...state,
                user: action.user,
                loggedIn: true,
                loginRequest: false
            };
        }

        case LOGIN_FAILED: {

            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            };
        }

        case LOGOUT_REQUEST: {

            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false
            };
        }

        case LOGOUT_SUCCESS: {

            return {
                ...state,
                user: initialState.user,
                loggedIn: false
            };
        }

        case LOGOUT_FAILED: {

            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            };
        }

        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerFailed: false,
            };
        }

        case REGISTER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                loggedIn: true,
                registerRequest: false,
            };
        }

        case REGISTER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true
            };
        }

        case FORGOT_PASSWORD_REQUEST: {

            return {
                ...state,
                forgotPasswordRequest: true
            };
        }

        case FORGOT_PASSWORD_SUCCESS: {

            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: false
            };
        }

        case FORGOT_PASSWORD_FAILED: {

            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true
            };
        }

        case RESET_PASSWORD_REQUEST: {

            return {
                ...state,
                resetPasswordRequest: true,
            };
        }

        case RESET_PASSWORD_SUCCESS: {

            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
            }
        }

        case RESET_PASSWORD_FAILED: {

            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true,
            }
        }

        default: {

            return state;
        }
    }
};
