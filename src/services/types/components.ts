import { MouseEventHandler, ReactNode } from "react";
import { TIngredient } from "./types";

// app-header
export interface INavItem {
    linkTo: string;
    icon: ReactNode;
};

// burger-ingredients
export interface IIngredients {
    tabId: string;
    name: string;
};

export interface IIngredient {
    product: TIngredient;
    className: string;
};

// ingredient-details
export interface IMicrolEmentsDetail {
    caseType: string;
    microElementValue: string | number;
}

export interface IIngredientImage {
    img: string;
    alt?: string;
}

// burger-constructor
export interface IConstructorIngredient {
    id: string;
    uid?: string;
    position?: 'top' | 'bottom';
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
    index?: number;
}

// modal
export interface IModalHeader {
    onClick: () => void;
};

// modal-overlay
export interface IModalOverlay {
    onClick?: () => void;
};

//  profile
export interface INavBar {
    linkTo: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>
}