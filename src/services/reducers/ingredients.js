import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    ADD_SELECTED_INGREDIENT,
    ADD_SELECTED_BUN,

    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
} from '../actions/ingredients';

const initialState = {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    selected: {
        ingredients: [],
        bun: null,
    },

    orders: [],
    orderRequest: false,
    orderFailed: false,
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Все ингредиенты (BurgerIngredients)

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
                allIngredients: action.allIngredients
            }
        }

        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            }
        }

        // выбранные ингредиенты (BurgerConstructor)

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
                    ingredients: [...state.selected.ingredients, action.id]
                }
            }
        }

        // Order

        case GET_ORDER_REQUEST: {
            return {
                ...state,
                ordersRequest: true
            };
        }

        case GET_ORDER_SUCCESS: {

            return { 
                ...state, 
                orderObject: action.order, 
                orders: [...state.orders, action.order], 
                orderRequest: false, 
                orderFailed: false, 

                selected: { 
                    ingredients: [], 
                    bun: null 
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

        default: {
            return state;
        }
    }
}