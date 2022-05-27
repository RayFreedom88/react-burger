import { Location } from "history";

export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
}

export type TSelectedIngredients = {
    id: string;
    uid: string;
};

export type TOrder = {
    name: string;
    number: number;
};

export type TShopState = {
    allIngredients: Array<TIngredient>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;

    selected: {
        bun: string | null;
        ingredients: Array<TSelectedIngredients>;
    };

    order: TOrder | null;
    orderRequest: boolean;
    orderFailed: boolean;
}

export type TUser = {
    name: string;
    email: string;
};

export type TAuthState = {
    user: TUser;

    loggedIn: boolean;

    loginRequest: boolean;
    loginFailed: boolean;

    logoutRequest: boolean;
    logoutFailed: boolean;

    updateTokenRequest: boolean;
    updateTokenFailed: boolean;

    getUserRequest: boolean;
    getUserFailed: boolean;

    updateUserRequest: boolean;
    updateUserFailed: boolean;

    registerRequest: boolean;
    registerFailed: boolean;

    forgotPasswordRequest: boolean;
    forgotPasswordFailed: boolean;

    resetPasswordRequest: boolean;
    resetPasswordFailed: boolean;
};

export type TLocation = {
    from: Location;
    background?: Location;
};
