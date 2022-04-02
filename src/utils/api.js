const URL_API = 'https://norma.nomoreparties.space/api';
const Endpoint = {
    INGREDIENTS: 'ingredients',
    ORDERS: 'orders'
}

export const getIngredients = async () => {

    return await fetch(`${URL_API}/${Endpoint.INGREDIENTS}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response.status);
        })
        .then(data => data)
        .catch(e => console.log(e))

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
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response.status);
        })
        .then(data => data)
        .catch(e => console.log(e))

}