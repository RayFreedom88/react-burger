import React, { CSSProperties, FC, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import FeedDetails from '../components/feed-details/feed-details';
import { wsConnectionClosedAction, wsConnectionStartAction } from '../services/actions/feed';
import { useDispatch, useSelector } from '../services/hooks';
import { WS_URL, WS_URL_ALL } from '../utils/const';
import { getCookie } from '../utils/cookie';

const styleIngredient: CSSProperties = {
    width: 720,
    padding: '0 80px',
    margin: '0 auto',
    marginTop: 120,
    textAlign: 'center'
};

export const OrderPage: FC = () => {
    const { orders } = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const isUserOrder = useRouteMatch({ path: '/profile/orders/' });
    const token = isUserOrder ? `?token=${getCookie('token')}` : '';

    useEffect(() => {
        dispatch(
            isUserOrder
                ? wsConnectionStartAction(WS_URL + token)
                : wsConnectionStartAction(WS_URL_ALL)
        );

        return () => {
            dispatch(wsConnectionClosedAction);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={styleIngredient}>
            <h1 className={`visually-hidden`}>Детали заказа</h1>

            {(orders.length > 0) && <FeedDetails orders={orders} />}
        </div>
    );
};
