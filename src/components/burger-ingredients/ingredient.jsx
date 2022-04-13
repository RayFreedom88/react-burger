import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { itemPropTypes } from '../../utils/types';

import { useSelector } from 'react-redux';
function Ingredient({ item, className, onClick }) {
    const { name, image, price } = item;

    const { bun, ingredients } = useSelector(state => state.ingredients.selected);

    const count = useMemo(() => {
        let count = 0;

        if (item.type === 'bun') {
            if (bun === item._id) count = 2;
        } else {
            ingredients.forEach(function (ingredient) {
                if (ingredient === item._id) count = count + 1;
            })
        }
        return count;
    },
        [bun, ingredients, item]
    );

    return (
        <li className={className} onClick={onClick}>
            {count >= 1 ? <Counter count={count} size='default' /> : null}

            <img src={image} alt={name} />

            <p className={`text text_type_digits-default mt-1 mb-1`}>
                <span>{price}</span>&nbsp;
                <CurrencyIcon type='primary' />
            </p>

            <p className={`text text_type_main-small mb-5`}>
                {name}
            </p>
        </li>
    );
}

Ingredient.propTypes = {
    item: itemPropTypes.isRequired,
    className: PropTypes.string.isRequired,
    count: PropTypes.number,
    onClick: PropTypes.func.isRequired
};

export default Ingredient;