import React, { FC } from 'react';
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details";
import { useSelector } from '../../services/hooks';

import styles from './ingredient.module.css'

export const IngredientPage: FC = () => {
    const { allIngredients } = useSelector(state => state.shop);

    if (!allIngredients.length) return null

    return (
        <div className={styles.container}>
            <h1 className='text text_type_main-large'>Детали ингредиента</h1>
            <IngredientDetails />
        </div>
    );
};
