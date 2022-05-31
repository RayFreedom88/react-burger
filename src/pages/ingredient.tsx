import React, { CSSProperties, FC } from 'react';
import IngredientDetails from "../components/burger-ingredients/ingredient-details/ingredient-details";
import { useSelector } from '../services/hooks';

const styleIngredient: CSSProperties = {
   width: 720,
   padding: '0 80px',
   margin: '0 auto',
   marginTop: 120,
   textAlign: 'center'
};

export const IngredientPage: FC = () => {
    const { allIngredients } = useSelector(state => state.shop);

    if (!allIngredients.length) return null

    return (
        <>
        <div style={styleIngredient}>
            <h1 className='text text_type_main-large'>Детали ингредиента</h1>

            <IngredientDetails />
        </div>
        </>
    );
};
