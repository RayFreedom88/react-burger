import { AnyAction } from 'redux';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,

    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,

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

import { initialState, authReducer } from './auth';

describe('Auth reducer', () => {
    const user = { name: "userTest", email: "test@email.com" };
    const userUpdate = { name: "userTestUpdate", email: "testUpdate@email.com" };

    it('Should return the initial state', () => {
        expect(authReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it('Should handle LOGIN_REQUEST', () => {
        const action = {
            type: LOGIN_REQUEST
        };

        const expectedState = {
            ...initialState,
            loginRequest: true,
            loginFailed: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle LOGIN_SUCCESS', () => {
        const action = {
            type: LOGIN_SUCCESS,
            user
        };

        const expectedState = {
            ...initialState,
            user: action.user,
            loggedIn: true,
            loginRequest: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle LOGIN_FAILED', () => {
        const action = {
            type: LOGIN_FAILED
        };

        const expectedState = {
            ...initialState,
            loginRequest: false,
            loginFailed: true
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle LOGOUT_REQUEST', () => {
        const action = {
            type: LOGOUT_REQUEST
        };

        const expectedState = {
            ...initialState,
            logoutRequest: true,
            logoutFailed: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle LOGOUT_SUCCESS', () => {
        const action = {
            type: LOGOUT_SUCCESS
        };

        const expectedState = {
            ...initialState,
            user: initialState.user,
            loggedIn: false
        };

        expect(authReducer({
            ...initialState,
            user
        }, action)).toEqual(expectedState);
    });

    it('Should handle LOGOUT_FAILED', () => {
        const action = {
            type: LOGOUT_FAILED
        };

        const expectedState = {
            ...initialState,
            logoutRequest: false,
            logoutFailed: true
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle UPDATE_TOKEN_REQUEST', () => {
        const action = {
            type: UPDATE_TOKEN_REQUEST
        };

        const expectedState = {
            ...initialState,
            updateTokenRequest: true,
            updateTokenFailed: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle UPDATE_TOKEN_SUCCESS', () => {
        const action = {
            type: UPDATE_TOKEN_SUCCESS
        };

        const expectedState = {
            ...initialState,
            loggedIn: true,
            updateTokenRequest: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle UPDATE_TOKEN_FAILED', () => {
        const action = {
            type: UPDATE_TOKEN_FAILED
        };

        const expectedState = {
            ...initialState,
            updateTokenFailed: true,
            updateTokenRequest: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle GET_USER_REQUEST', () => {
        const action = {
            type: GET_USER_REQUEST
        };

        const expectedState = {
            ...initialState,
            getUserRequest: true,
            getUserFailed: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle GET_USER_SUCCESS', () => {
        const action = {
            type: GET_USER_SUCCESS,
            user
        };

        const expectedState = {
            ...initialState,
            user: action.user,
            loggedIn: true,
            getUserRequest: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle GET_USER_FAILED', () => {
        const action = {
            type: GET_USER_FAILED,
        };

        const expectedState = {
            ...initialState,
            getUserRequest: false,
            getUserFailed: true
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle UPDATE_USER_REQUEST', () => {
        const action = {
            type: UPDATE_USER_REQUEST,
        };

        const expectedState = {
            ...initialState,
            updateUserRequest: true,
            updateUserFailed: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle UPDATE_USER_SUCCESS', () => {
        const action = {
            type: UPDATE_USER_SUCCESS,
            user: userUpdate
        };

        const expectedState = {
            ...initialState,
            user: action.user,
            updateUserRequest: false
        };

        expect(authReducer({
            ...initialState,
            user
        }, action)).toEqual(expectedState);
    });

    it('Should handle UPDATE_USER_FAILED', () => {
        const action = {
            type: UPDATE_USER_FAILED
        };

        const expectedState = {
            ...initialState,
            updateUserRequest: false,
            updateUserFailed: true
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle REGISTER_REQUEST', () => {
        const action = {
            type: REGISTER_REQUEST
        };

        const expectedState = {
            ...initialState,
            registerRequest: true,
            registerFailed: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle REGISTER_SUCCESS', () => {
        const action = {
            type: REGISTER_SUCCESS,
            user
        };

        const expectedState = {
            ...initialState,
            user: action.user,
            loggedIn: true,
            registerRequest: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle REGISTER_FAILED', () => {
        const action = {
            type: REGISTER_FAILED
        };

        const expectedState = {
            ...initialState,
            registerRequest: false,
            registerFailed: true
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle FORGOT_PASSWORD_REQUEST', () => {
        const action = {
            type: FORGOT_PASSWORD_REQUEST
        };

        const expectedState = {
            ...initialState,
            forgotPasswordRequest: true,
            forgotPasswordFailed: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle FORGOT_PASSWORD_SUCCESS', () => {
        const action = {
            type: FORGOT_PASSWORD_SUCCESS
        };

        const expectedState = {
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordFailed: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle FORGOT_PASSWORD_FAILED', () => {
        const action = {
            type: FORGOT_PASSWORD_FAILED
        };

        const expectedState = {
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordFailed: true
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle RESET_PASSWORD_REQUEST', () => {
        const action = {
            type: RESET_PASSWORD_REQUEST
        };

        const expectedState = {
            ...initialState,
            resetPasswordRequest: true,
            resetPasswordFailed: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle RESET_PASSWORD_SUCCESS', () => {
        const action = {
            type: RESET_PASSWORD_SUCCESS
        };

        const expectedState = {
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: false
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle RESET_PASSWORD_FAILED', () => {
        const action = {
            type: RESET_PASSWORD_FAILED
        };

        const expectedState = {
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: true
        };

        expect(authReducer(initialState, action)).toEqual(expectedState);
    });
});
