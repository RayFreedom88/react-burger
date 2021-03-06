import { TOrders } from "../types/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_ORDER_GET: 'WS_ORDER_GET' = 'WS_ORDER_GET';

export interface IWSConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSOrderGetAction {
    readonly type: typeof WS_ORDER_GET;
    readonly payload: TOrders;
}

export type TFeedActions =
    | IWSConnectionStartAction
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSOrderGetAction;

export const wsConnectionStartAction = (payload: string): IWSConnectionStartAction => ({
    type: WS_CONNECTION_START,
    payload
});

export const wsOrderConnectionSuccessAction = (): IWSConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS
});

export const wsOrderConnectionErrorAction = (): IWSConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR
});

export const wsConnectionClosedAction = (): IWSConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED
});

export const wsOrderGetAction = (payload: TOrders): IWSOrderGetAction => ({
    type: WS_ORDER_GET,
    payload
});

export type TWSOrderActions = {
    wsInit: typeof WS_CONNECTION_START;
    onOpen: typeof WS_CONNECTION_SUCCESS;
    onError: typeof WS_CONNECTION_ERROR;
    onClose: typeof WS_CONNECTION_CLOSED;
    onOrders: typeof WS_ORDER_GET;
};

export const wsOrderActions: TWSOrderActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onError: WS_CONNECTION_ERROR,
    onClose: WS_CONNECTION_CLOSED,
    onOrders: WS_ORDER_GET,
};
