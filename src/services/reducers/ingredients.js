import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    ADD_SELECTED_INGREDIENT,
    ADD_SELECTED_BUN,
    DELETE_SELECTED_INGREDIENT,
    UPDATE_SELECTED_LIST,

    ADD_INGREDIENT_MODAL,
    DELETE_INGREDIENT_MODAL,

    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
} from '../actions/ingredients';

const initialState = {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    selected: {
        bun: null,
        ingredients: [],
    },

    currentIngredient: {},

    orders: null,
    orderRequest: false,
    orderFailed: false,
};

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

        case UPDATE_SELECTED_LIST : {

            return {
                ...state,
                selected: {
                    ...state.selected,
                    ingredients: action.ingredients
                }
            }
        }

        // Modal

        case ADD_INGREDIENT_MODAL: {

            return {
                ...state,
                currentIngredient: action.ingredient
            }
        }

        case DELETE_INGREDIENT_MODAL: {

            return {
                ...state,
                currentIngredient: {}
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
                order: action.order,
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
};