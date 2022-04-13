const Endpoint = {
    INGREDIENTS: 'ingredients',
    ORDERS: 'orders'
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
}

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
}