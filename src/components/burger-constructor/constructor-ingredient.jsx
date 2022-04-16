import React from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';
import { DELETE_SELECTED_INGREDIENT } from '../../services/actions/ingredients';

import styles from './burger-constructor.module.css';

function ConstructorIngredient({ id, uid, position }) {
    const dispatch = useDispatch();

    const allIngredients = useSelector(state => state.ingredients.allIngredients);
    const product = allIngredients.find(item => item._id === id);

    const handleDeleteInredient = () => {
        dispatch({
            type: DELETE_SELECTED_INGREDIENT, 
            uid: uid
        });
      }

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
                handleClose={ handleDeleteInredient }
            />
        </li>
    )
};

ConstructorIngredient.propTypes = {
    id: PropTypes.string.isRequired,
    uid: PropTypes.string,
    position: PropTypes.string,
  }; 

export default ConstructorIngredient;
