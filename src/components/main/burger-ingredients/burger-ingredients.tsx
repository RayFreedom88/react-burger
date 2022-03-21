import React from "react";
import BurgerIngredientsStyles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";

function BurgerIngredients() {
    const [current, setCurrent] = useState('one');
        return (
            <div className={BurgerIngredientsStyles.wrap}>
                <p className="text text_type_main-large">
                    Собери бургер
                </p>
                
                <div className={BurgerIngredientsStyles.tab_list}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        One
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Two
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Three
                    </Tab>
                </div>
            </div>
        );
}

export default BurgerIngredients;