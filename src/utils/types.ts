import PropTypes from 'prop-types';
import { Location } from "history";

export const itemPropTypes = PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number,
    _id: PropTypes.string.isRequired
});

export type TState = {
    auth: {
        user: {
            name: string,
            email: string,
        },
    
        loggedIn: boolean,
    
        loginRequest: boolean,
        loginFailed: boolean,
    
        logoutRequest: boolean,
        logoutFailed: boolean,
    
        updateTokenRequest: boolean,
        updateTokenFailed: boolean,
    
        getUserRequest: boolean,
        getUserFailed: boolean,
    
        updateUserRequest: boolean,
        updateUserFailed: boolean,
    
        registerRequest: boolean,
        registerFailed: boolean,
    
        forgotPasswordRequest: boolean,
        forgotPasswordFailed: boolean,
    
        resetPasswordRequest: boolean,
        resetPasswordFailed: boolean,
    }
};

export type TLocation = {
    from: Location;
    background?: Location;
};
