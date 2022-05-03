import React from 'react';
import IngredientDetails from "../components/burger-ingredients/ingredient-details/ingredient-details";
import { useSelector } from 'react-redux';

const styleIngredient = {
   width: 720,
   padding: '0 80px',
   margin: '0 auto',
   marginTop: 120,
   textAlign: 'center'
};

export function IngredientPage() {
    const { allIngredients } = useSelector(state => state.shop);

    if (!allIngredients.length) return null

    return (
        <div style={styleIngredient}>
            <h1 className='text text_type_main-large'>Детали ингредиента</h1>

            <IngredientDetails />
        </div>
    );
};
