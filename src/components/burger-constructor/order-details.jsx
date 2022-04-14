import React from 'react';

import { useSelector } from 'react-redux';

import done from '../../images/done.png'
import styles from './burger-constructor.module.css';

export default function OrderDetails() {
    const orderNumber = useSelector(state => state.ingredients.order.number);

    return (
        <>
            <p className={`${styles.burgerconstructor__id} text text_type_digits-large mt-4 mb-8`}>{orderNumber}</p>
            <p className={`text text_type_main-medium`}>идентификатор заказа</p>
            <div className={`mt-15 mb-15`}>
                <img src={done} className={styles.burgerconstructor__img} alt={`done`} />
            </div>
            <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
};
