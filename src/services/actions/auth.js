import { postForgotPasswordRequest, postResetPasswordRequest } from '../../api/api';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

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

    return function(dispatch) {
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
