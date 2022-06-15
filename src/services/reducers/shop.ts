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
    TShopsActions,
} from '../actions/shop';
import { TShopState } from '../types/types';

export const initialState: TShopState = {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    selected: {
        bun: null,
        ingredients: [],
    },

    order: null,
    orderRequest: false,
    orderFailed: false,
};

export const shopReducer = (state = initialState, action: TShopsActions): TShopState => {
    switch (action.type) {

        // BurgerIngredients
        case GET_INGREDIENTS_REQUEST: {

            return {
                ...state,
                ingredientsRequest: true
            }
        }

        case GET_INGREDIENTS_SUCCESS: {

            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                allIngredients: action.dataIngredients
            }
        }

        case GET_INGREDIENTS_FAILED: {

            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            }
        }

        // BurgerConstructor
        case ADD_SELECTED_BUN: {

            return {
                ...state,
                selected: {
                    ...state.selected,
                    bun: action.id
                }
            }
        }

        case ADD_SELECTED_INGREDIENT: {

            return {
                ...state,
                selected: {
                    ...state.selected,
                    ingredients: [...state.selected.ingredients, action.ingredient]
                }
            }
        }

        case DELETE_SELECTED_INGREDIENT: {

            return {
                ...state,
                selected: {
                    ...state.selected,
                    ingredients: state.selected.ingredients.filter(ingredient => ingredient.uid !== action.uid)
                }
            }
        }

        case UPDATE_SELECTED_LIST: {

            return {
                ...state,
                selected: {
                    ...state.selected,
                    ingredients: action.ingredients
                }
            }
        }

        // Order
        case GET_ORDER_REQUEST: {

            return {
                ...state,
                orderRequest: true
            };
        }

        case GET_ORDER_SUCCESS: {

            return {
                ...state,
                order: action.order,
                orderRequest: false,
                orderFailed: false,

                selected: {
                    bun: null,
                    ingredients: []
                }
            };
        }

        case GET_ORDER_FAILED: {

            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            };
        }

        case CLOSE_ORDER: {

            return {
                ...state,
                order: null
            };
        }

        default: {

            return state;
        }
    }
};