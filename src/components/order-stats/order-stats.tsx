import { FC, useMemo } from 'react';
import { useSelector } from '../../services/hooks';
import styles from './order-stats.module.css';

const OrderStats: FC = () => {
    const { total, totalToday, orders } = useSelector((store) => store.feed);

    const pendingOrders = useMemo(() => orders?.filter((item) => item.status === 'pending').slice(0, 10), [orders]);

    const doneOrders = useMemo(() => orders?.filter((item) => item.status === 'done').slice(0, 10), [orders]);

    return (
        <div className={styles.column}>
            <div className={styles.boards}>
                <div className={styles.board}>
                    <p className='text text_type_main-medium mb-4'>Готовы:</p>

                    <ul className={`${styles.list} ${styles.done}`}>
                        {doneOrders?.map((order) => (
                            <li className={'text text_type_digits-default'} key={order._id}>{order.number}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.board}>
                    <p className='text text_type_main-medium mb-4'>В работе:</p>

                    <ul className={styles.list}>
                        {pendingOrders?.map((order) => (
                            <li className='text text_type_digits-default' key={order._id}>{order.number}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
            <p className={`${styles.ts} text text_type_digits-large`}>{total}</p>
            <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
            <p className={`${styles.ts} text text_type_digits-large`}>{totalToday}</p>
        </div>
    )
};

export default OrderStats;
