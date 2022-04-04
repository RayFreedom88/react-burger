const URL_API = 'https://norma.nomoreparties.space/api';
const Endpoint = {
    INGREDIENTS: 'ingredients',
    ORDERS: 'orders'
}

const checkReponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
};
  

export const getIngredients = async () => {

    return await fetch(`${URL_API}/${Endpoint.INGREDIENTS}`)
        .then(checkReponse)
        .then(data => data)
}

export const postOrder = async (ingredientsId) => {

    return await fetch(`${URL_API}/${Endpoint.ORDERS}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients: ingredientsId })
    })
        .then(checkReponse)
        .then(data => data)
}