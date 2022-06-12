import React, { FC, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import FeedDetails from '../../components/feed-details/feed-details';
import Preloader from '../../components/preloader/preloader';
import { wsConnectionClosedAction, wsConnectionStartAction } from '../../services/actions/feed';
import { useDispatch, useSelector } from '../../services/hooks';
import { WS_URL, WS_URL_ALL } from '../../utils/const';
import { getCookie } from '../../utils/cookie';

import styles from './order.module.css'

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
        <div className={styles.container}>
            <h1 className={`visually-hidden`}>Детали заказа</h1>

            {
                (orders.length > 0)
                    ? <FeedDetails orders={orders} />
                    : <Preloader width={560} height={642}/>
            }
        </div>
    );
};
