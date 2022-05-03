import { getData, postOrder } from '../../api/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const ADD_SELECTED_BUN = 'ADD_SELECTED_BUN';
export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT';
export const UPDATE_SELECTED_LIST = 'UPDATE_SELECTED_LIST';

export const ADD_INGREDIENT_MODAL = 'ADD_INGREDIENT_MODAL';
export const DELETE_INGREDIENT_MODAL = 'DELETE_INGREDIENT_MODAL';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export function getItems() {

    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });

        getData()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        allIngredients: res.data
                    });
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    });
                }
            })
            .catch(err => console.log(err));
    }
};

export function getOrder(ingredients) {

    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });

        postOrder(ingredients)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        order: {
                            name: res.name,
                            number: res.order.number
                        }
                    });
                } else {
                    dispatch({
                        type: GET_ORDER_FAILED
                    });
                }
            })
            .catch(() =>
                dispatch({
                    type: GET_ORDER_FAILED
                })
            );
    };
};
