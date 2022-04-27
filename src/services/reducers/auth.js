import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
} from '../actions/auth';

const initialState = {
    user: {
        email: '',
    },

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
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

        default: {

            return state;
        }
    }
};
