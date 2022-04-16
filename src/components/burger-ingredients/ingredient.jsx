import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

function Ingredient({ product, className, onClick }) {
    const { name, image, price } = product;

    const { bun, ingredients } = useSelector(state => state.shop.selected);

    const [{ boxShadow }, dragRef] = useDrag({
        type: 'item',
        item: { id: product._id },

        collect: monitor => ({
            boxShadow: monitor.isDragging()
                ? '0px 0px 16px 8px rgb(51 51 255 / 25%), 0px 0px 8px 8px rgb(51 51 255 / 25%)'
                : 'none'
        })
    });

    const count = useMemo(() => {
        let count = 0;

        if (product.type === 'bun') {
            if (bun === product._id) count = 2;
        } else {
            ingredients.forEach(function (ingredient) {
                if (ingredient.id === product._id) count = count + 1;
            })
        }
        return count;
    },
        [bun, ingredients, product]
    );

    return (
        <li className={className} onClick={onClick} style={{ boxShadow }} ref={dragRef}>
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
    product: itemPropTypes.isRequired,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Ingredient;