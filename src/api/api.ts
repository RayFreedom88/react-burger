import { getCookie } from "../utils/cookie";

const Endpoint = {
    INGREDIENTS: 'ingredients',
    ORDERS: 'orders',
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    UPDATE_TOKEN: 'auth/token',
    USER: 'auth/user',
    REGISTER: 'auth/register',
    FORGOT_PASSWORD: 'password-reset',
    RESET_PASSWORD: 'password-reset/reset'
};
const URL_API = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};


export const getData = async () => {

    return await fetch(`${URL_API}/${Endpoint.INGREDIENTS}`)
        .then(checkResponse);
};

export const postOrder = async (ingredientsId: Array<string>) => {

    return await fetch(`${URL_API}/${Endpoint.ORDERS}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: ingredientsId
        })
    })
        .then(checkResponse);
};

export const postLoginRequest = async (email: string, password: string) => {
    return await fetch(`${URL_API}/${Endpoint.LOGIN}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse);
}

export const postLogoutRequest = async () => {
    return await fetch(`${URL_API}/${Endpoint.LOGOUT}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        }),
    })
        .then(checkResponse);
};

export const postUpdateTokenRequest = async () => {
    return await fetch(`${URL_API}/${Endpoint.UPDATE_TOKEN}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.refreshToken
        })
    })
        .then(checkResponse)
};

export const getUserRequest = () => {
    return fetch(`${URL_API}/${Endpoint.USER}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`
        },
    })
        .then(checkResponse)

};

export async function patchUpdateUser(email: string, name: string) {

    return fetch(`${URL_API}/${Endpoint.USER}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('token')}`
        },
        body: JSON.stringify({ email, name })
    })
        .then(checkResponse)
}

export const postRegisterRequest = async (email: string, password: string, name: string) => {
    return await fetch(`${URL_API}/${Endpoint.REGISTER}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name }),
    })
        .then(checkResponse);
};

export const postForgotPasswordRequest = async (email: string) => {

    return await fetch(`${URL_API}/${Endpoint.FORGOT_PASSWORD}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(checkResponse);
};

export const postResetPasswordRequest = async (password: string, token: string) => {

    return await fetch(`${URL_API}/${Endpoint.RESET_PASSWORD}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token })
    })
        .then(checkResponse);
};

