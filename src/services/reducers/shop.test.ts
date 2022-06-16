import { AnyAction } from 'redux';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    ADD_SELECTED_INGREDIENT,
    ADD_SELECTED_BUN,
    DELETE_SELECTED_INGREDIENT,
    UPDATE_SELECTED_LIST,

    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER,
} from '../actions/shop';

import { initialState, shopReducer } from './shop';

describe('Shop reducer', () => {
    const dataIngredients = [{
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
    }];

    it('Should return the initial state', () => {
        expect(shopReducer(undefined, {} as AnyAction)).toEqual(initialState);
    });

    it('Should handle GET_INGREDIENTS_REQUEST', () => {
        const action = {
            type: GET_INGREDIENTS_REQUEST
        };

        const expectedState = {
            ...initialState,
            ingredientsRequest: true
        };

        expect(shopReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle GET_INGREDIENTS_SUCCESS', () => {
        const action = {
            type: GET_INGREDIENTS_SUCCESS,
            dataIngredients
        };

        const expectedState = {
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: false,
            allIngredients: action.dataIngredients
        };

        expect(shopReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle GET_INGREDIENTS_FAILED', () => {
        const action = {
            type: GET_INGREDIENTS_FAILED
        };

        const expectedState = {
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: true
        };

        expect(
            shopReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle ADD_SELECTED_INGREDIENT', () => {
        const action = {
            type: ADD_SELECTED_INGREDIENT,
                ingredient: {
                    id: 'a1',
                    uid: 'a2'
                }
        };

        const expectedState = {
            ...initialState,
            selected: {
                ...initialState.selected,
                ingredients: [{id: 'a1', uid: 'a2'}]
            }
        };

        expect(shopReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle ADD_SELECTED_BUN', () => {
        const action = {
            type: ADD_SELECTED_BUN,
            id: 'b1'
        };

        const expectedState = {
            ...initialState,
            selected: {
                ...initialState.selected,
                bun: 'b1'
            }
        };

        expect(shopReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle DELETE_SELECTED_INGREDIENT', () => {
        const action = {
            type: DELETE_SELECTED_INGREDIENT,
            uid: 'a2'
        };

        const expectedState = {
            ...initialState,
            selected: {
                ...initialState.selected,
                ingredients: []
            }
        };

        expect(shopReducer({
            ...initialState,
            selected: {
                bun: null,
                ingredients: [{id: 'a1', uid: 'a2'}]
            }
        }, action)).toEqual(expectedState);
    });

    it('Should handle UPDATE_SELECTED_LIST', () => {
        const action = {
            type: UPDATE_SELECTED_LIST,
            ingredients: [{id: 'a1', uid: 'a2'}]
        };

        const expectedState = {
            ...initialState,
            selected: {
                ...initialState.selected,
                ingredients: action.ingredients
            }
        };

        expect(shopReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle GET_ORDER_REQUEST', () => {
        const action = {
            type: GET_ORDER_REQUEST,
        };

        const expectedState = {
            ...initialState,
            orderRequest: true
        };

        expect(shopReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle GET_ORDER_SUCCESS', () => {
        const action = {
            type: GET_ORDER_SUCCESS,
            order: {
                name: 'nameTest',
                number: 12345
            }
        };

        const expectedState = {
            ...initialState,
            order: action.order,
            orderRequest: false,
            orderFailed: false,
            selected: {
                bun: null,
                ingredients: []
            }
        };

        expect(shopReducer({
            ...initialState,
            selected: {
                bun: 'b1',
                ingredients: [{id: 'a1', uid: 'a2'}]
            }
        }, action)).toEqual(expectedState);
    });

    it('Should handle GET_ORDER_FAILED', () => {
        const action = {
            type: GET_ORDER_FAILED,
        };

        const expectedState = {
            ...initialState,
            orderRequest: false,
            orderFailed: true
        };

        expect(shopReducer(initialState, action)).toEqual(expectedState);
    });

    it('Should handle CLOSE_ORDER', () => {
        const action = {
            type: CLOSE_ORDER,
        };

        const expectedState = {
            ...initialState,
            order: null
        };

        expect(shopReducer({
            ...initialState,
            order: {
                name: 'nameTest',
                number: 12345
            }
        }, action)).toEqual(expectedState);
    });
});
