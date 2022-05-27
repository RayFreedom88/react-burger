import { getData, postOrder } from '../../utils/api';
import { AppDispatch, AppThunk } from '../types';
import { TIngredient, TOrder, TSelectedIngredients } from '../types/types';

// INGREDIENTS
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

// CONSTRUCTOR
export const ADD_SELECTED_INGREDIENT: 'ADD_SELECTED_INGREDIENT' = 'ADD_SELECTED_INGREDIENT';
export const ADD_SELECTED_BUN: 'ADD_SELECTED_BUN' = 'ADD_SELECTED_BUN';
export const DELETE_SELECTED_INGREDIENT: 'DELETE_SELECTED_INGREDIENT' = 'DELETE_SELECTED_INGREDIENT';
export const UPDATE_SELECTED_LIST: 'UPDATE_SELECTED_LIST' = 'UPDATE_SELECTED_LIST';

// ORDER
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const CLOSE_ORDER: 'CLOSE_ORDER' = 'CLOSE_ORDER';

// INGREDIENTS INTERFACE
export interface IGetIngredientRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly allIngredients: Array<TIngredient>
}

export interface IGetIngredientFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

// CONSTRUCTOR INTERFACE
export interface IAddSelectedAction {
    readonly type: typeof ADD_SELECTED_INGREDIENT;
    readonly ingredient: TSelectedIngredients;
}

export interface IAddSelectedBunAction {
    readonly type: typeof ADD_SELECTED_BUN;
    readonly id: string;
}

export interface IDeleteSelectedIngredientAction {
    readonly type: typeof DELETE_SELECTED_INGREDIENT;
    readonly uid: string;
}

export interface IUpdateSelectedListAction {
    readonly type: typeof UPDATE_SELECTED_LIST;
    readonly ingredients: Array<TSelectedIngredients>;
}

// ORDER INTERFACE
export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly order: TOrder;
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export interface ICloceOrderAction {
    readonly type: typeof CLOSE_ORDER;
}

// TYPE SHOPS
export type TShopsActions =
    | IGetIngredientRequestAction
    | IGetIngredientSuccessAction
    | IGetIngredientFailedAction
    | IAddSelectedAction
    | IAddSelectedBunAction
    | IDeleteSelectedIngredientAction
    | IUpdateSelectedListAction
    | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderFailedAction
    | ICloceOrderAction;

export const getItems: AppThunk = () => (dispatch: AppDispatch) => {
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
};

export const getOrder: AppThunk = (ingredients: Array<string>) => (dispatch: AppDispatch) => {
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
