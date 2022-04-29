const Endpoint = {
    INGREDIENTS: 'ingredients',
    ORDERS: 'orders',
    REGISTER: 'auth/register',
    FORGOT_PASSWORD: 'password-reset',
    RESET_PASSWORD: 'password-reset/reset'
};
const URL_API = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};


export const getData = async () => {

    return await fetch(`${URL_API}/${Endpoint.INGREDIENTS}`)
        .then(checkReponse);
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
        .then(checkReponse);
};

export const postRegisterRequest = async (email, password, name) => {
    return await fetch(`${URL_API}/${Endpoint.REGISTER}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            name
        }),
    })
        .then(checkReponse);
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
        .then(checkReponse);
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
        .then(checkReponse);
};

