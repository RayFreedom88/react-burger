const Endpoint = {
    INGREDIENTS: 'ingredients',
    ORDERS: 'orders',
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    REGISTER: 'auth/register',
    FORGOT_PASSWORD: 'password-reset',
    RESET_PASSWORD: 'password-reset/reset'
};
const URL_API = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};


export const getData = async () => {

    return await fetch(`${URL_API}/${Endpoint.INGREDIENTS}`)
        .then(checkResponse);
};

export const postOrder = async (ingredientsId) => {

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

export const postLoginRequest = async (email, password) => {
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
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        }),
    })
        .then(checkResponse);
};

export const postRegisterRequest = async (email, password, name) => {
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

export const postForgotPasswordRequest = async (email) => {

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

export const postResetPasswordRequest = async (password, token) => {

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

