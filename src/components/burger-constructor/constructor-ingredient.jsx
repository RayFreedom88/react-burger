import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import styles from './burger-constructor.module.css';

function ConstructorIngredient({ id, position }) {
    const allIngredients = useSelector(state => state.ingredients.allIngredients);

    const product = allIngredients.find(item => item._id === id);

    return (position ? 
        <ConstructorElement
            type={ position }
            isLocked={ true }
            text={ `${ product.name } ${ position === 'top' ? ' (верх)' : ' (низ)' }` }
            price={ product.price }
            thumbnail={ product.image }
        />
       : 
        <li className={ styles.burgerconstructor__item } >
            <DragIcon type='primary' />

            <ConstructorElement
                text={ product.name }
                price={ product.price }
                thumbnail={ product.image }
            />
        </li>
    )
};

ConstructorIngredient.propTypes = {
    id: PropTypes.string.isRequired,
    position: PropTypes.string,
  }; 

export default ConstructorIngredient;
