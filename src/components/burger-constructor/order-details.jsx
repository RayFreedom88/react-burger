import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import done from '../../images/done.png'

export default function OrderDetails({ id }) {

    return (
        <div>
            <p className={`${styles._id} text text_type_digits-large mt-4 mb-8`}>{id}</p>
            <p className={`text text_type_main-medium`}>идентификатор заказа</p>
            <div className={`mt-15 mb-15`}>
                <img src={done} className={styles._img} alt={`done`} />
            </div>
            <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive mb-30`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
}