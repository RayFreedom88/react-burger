import React, { FC, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from '../../services/hooks';
import { IIngredient } from '../../services/types/components';

const Ingredient: FC<IIngredient> = ({ product, className}) => {
    const location = useLocation();

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
        <li style={{ boxShadow }} ref={dragRef}>
            <Link 
                className={className}
                to={{
                    pathname: `/ingredients/${product._id}`,
                    state: { background: location }
                }}
            >
                {count >= 1 ? <Counter count={count} size='default' /> : null}

                <img src={image} alt={name} />

                <p className={`text text_type_digits-default mt-1 mb-1`}>
                    <span>{price}</span>&nbsp;
                    <CurrencyIcon type='primary' />
                </p>

                <p className={`text text_type_main-default mb-5`}>
                    {name}
                </p>
            </Link>
        </li>
    );
};

export default Ingredient;