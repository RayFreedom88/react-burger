import React from "react";
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";


function BurgerIngredients({items}) {
    const [current, setCurrent] = React.useState('булки');

    const getRandom = function (min, max) {
        const lower = Math.ceil(Math.min((min), (max)));
        const upper = Math.floor(Math.max((min), (max)));
        const result = Math.random() * (upper - lower + 1) + lower;
        return Math.floor(result);
      };

    return (
        <div className={burgerIngredientsStyles.burgerIngredients}>
            <h2 className="visually-hidden">Конструктор бургеров</h2>

            <p className="text text_type_main-large mt-5 pt-5">
                Собери бургер
            </p>

            <div className={burgerIngredientsStyles.tabs}>
                <Tab value="булки" active={current === 'булки'} onClick={setCurrent}>
                    Булки
                </Tab>

                <Tab value="соусы" active={current === 'соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>

                <Tab value="начинки" active={current === 'начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={burgerIngredientsStyles.scrollWrapper}>
                <div className={burgerIngredientsStyles.wrap}>
                    <div className={burgerIngredientsStyles.ingredients}>
                        <h3 className="text text_type_main-medium">Булки</h3>

                        <ul className={burgerIngredientsStyles.list}>
                            {items.map(item => item.type === 'bun' ? (
                                <Ingredient 
                                    class={burgerIngredientsStyles.item} 
                                    name={item.name} 
                                    image={item.image} 
                                    price={item.price} 
                                    key={item._id} 
                                    count={item.name === 'Краторная булка N-200i' ? 1 : 0}
                                />) : (null)
                            )}
                        </ul>
                    </div>

                    <div className={burgerIngredientsStyles.ingredients}>
                        <h3 className="text text_type_main-medium">Соусы</h3>

                        <ul className={burgerIngredientsStyles.list}>
                            {items.map(item => item.type === 'sauce' ? (
                                <Ingredient 
                                    class={burgerIngredientsStyles.item} 
                                    name={item.name} 
                                    image={item.image} 
                                    price={item.price} 
                                    key={item._id}
                                    count={getRandom(0, 1)}
                                />) : (null)
                            )}
                        </ul>
                    </div>

                    <div className={burgerIngredientsStyles.ingredients}>
                        <h3 className="text text_type_main-medium">Начинки</h3>

                        <ul className={burgerIngredientsStyles.list}>
                            {items.map(item => item.type === 'main' ? (
                                <Ingredient 
                                    class={burgerIngredientsStyles.item} 
                                    name={item.name} 
                                    image={item.image} 
                                    price={item.price} 
                                    key={item._id}
                                    count={getRandom(0, 1)} 
                                />) : (null)
                            )}
                        </ul>
                    </div>  
                </div>
            </div>

        </div>
    );
}

BurgerIngredients.propTypes = {
   items: PropTypes.arrayOf(PropTypes.object.isRequired)
};

export default BurgerIngredients;