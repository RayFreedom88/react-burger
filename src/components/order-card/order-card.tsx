import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import {
    IOrderCard,
    IOrderCardIngredients,
} from '../../services/types/components';
import { TIngredient } from '../../services/types/types';
import { getOrderData, getOrderStatus } from '../../utils/common';

import styles from '../order-card/order-card.module.css';

const OrderCardPrice: FC = ({ children }) => {
    return (
        <div className={`${styles.price}`}>
            <p className='text text_type_digits-default mr-2'>{children}</p>
            <CurrencyIcon type='primary' />
        </div>
    );
};

const OrderCardIngredients: FC<IOrderCardIngredients> = ({ idIngredients }) => {
    const { allIngredients } = useSelector((state) => state.shop);

    const orderIngredients = allIngredients.filter((ingredient) =>
        idIngredients.includes(ingredient._id)
    );

    let totalPrice = 0;

    const dataToIngredientPreview = (orderIngredient: TIngredient, index: number) => {
        const count = idIngredients.filter((idIngredient) => idIngredient === orderIngredient._id).length;
        (orderIngredient.type === 'bun')
            ? totalPrice += orderIngredient!.price * 2
            : totalPrice += orderIngredient!.price * count;

        return (
            <li className={styles.ingredient} style={{ zIndex: 100 - index }} key={index}>
                <div className={styles.ingredient_preview}>
                    <img
                        src={orderIngredient.image}
                        alt={orderIngredient.name}
                    />

                    {(orderIngredient.type !== 'bun' && count > 1) &&
                        <span className={`${styles.ingredient_count} text text_type_main-default`}>+{count}</span>
                    }
                </div>
            </li>
        );
    };

    return (
        <>
            <ul className={styles.ingredients}>
                {orderIngredients.map(dataToIngredientPreview)}
            </ul>

            <OrderCardPrice>{totalPrice}</OrderCardPrice>
        </>
    );
};

const OrderCard: FC<IOrderCard> = ({
    orders,
    orderID,
    number,
    time,
    name,
    ingredients,
    status,
    isUserOrder,
}) => {
    const location = useLocation();
    const orderTime = getOrderData(time);
    const orderStatus = getOrderStatus(status);

    return (
        <Link to={{
            pathname: `${location.pathname}/${orderID}`,
            state: { background: location, number: number, orders: orders }
        }}>
            <div className={styles.card}>
                <div className={styles.info}>
                    <p className={`text text_type_digits-default pb-6`}>
                        #{number}
                    </p>

                    <p className='text text_type_main-default text_color_inactive'>
                        {orderTime}
                    </p>
                </div>

                <p className='text text_type_main-medium pr-6 pl-6'>{name}</p>

                {isUserOrder &&
                    <p className='text text_type_main-default pt-2 pr-6 pl-6' style={{ color: orderStatus.color }}>{orderStatus.name}</p>
                }
                <div className={styles.info}>
                    <OrderCardIngredients idIngredients={ingredients} />
                </div>
            </div>
        </Link>
    );
};

export default OrderCard;
