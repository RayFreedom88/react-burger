import {
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

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
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
