import { FC, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { wsConnectionClosedAction, wsConnectionStartAction } from '../../services/actions/feed';
import { useDispatch, useSelector } from '../../services/hooks';
import { TOrder } from '../../services/types/types';
import { WS_URL, WS_URL_ALL } from '../../utils/const';
import { getCookie } from '../../utils/cookie';
import OrderCard from '../order-card/order-card';

import styles from './order-list.module.css'

const OrderList: FC = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((store) => store.feed);

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
    }, [dispatch]);

    const dataToOrder = (order: TOrder) => {

        return (
            <li className={isUserOrder?.isExact ? styles.item_profile : styles.item} key={order._id}>
                <OrderCard
                    orders={orders}
                    orderID={order._id}
                    number={order.number}
                    time={order.createdAt}
                    name={order.name}
                    ingredients={order.ingredients}
                    status={order.status}
                    isUserOrder={isUserOrder}
                />
            </li>
        )
    }

    return (
        <div className={isUserOrder?.isExact ? styles.column_profile : styles.column}>
            <ul className={styles.list}>
                {(orders.length > 0) ? orders.map(dataToOrder) : null}
            </ul>
        </div>
    );
};

export default OrderList;
