import React from "react";
import BurgerIngredientsStyles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from "../ingredient/ingredient";
import { useState } from "react";


function BurgerIngredients() {
    const [current, setCurrent] = useState('булки');

    return (
        <div className={BurgerIngredientsStyles.burgerIngredients}>
            <h2 className="visually-hidden">Конструктор бургеров</h2>

            <p className="text text_type_main-large mt-5 pt-5">
                Собери бургер
            </p>

            <div className={BurgerIngredientsStyles.burgerIngredients__tabs}>
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

            <div className={BurgerIngredientsStyles.burgerIngredients__scrollWrapper}>
                <div className={BurgerIngredientsStyles.burgerIngredients__wrap}>
                    <div className={BurgerIngredientsStyles.burgerIngredients__ingredients}>
                        <h3 className="text text_type_main-medium">Булки</h3>

                        <ul className={BurgerIngredientsStyles.burgerIngredients__list}>
                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Краторная булка N-200i" image="https://code.s3.yandex.net/react/code/bun-02.png" price={20} count={1} />
                            </li>

                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Флюоресцентная булка R2-D3" image="https://code.s3.yandex.net/react/code/bun-01.png" price={20} />
                            </li>
                        </ul>
                    </div>

                    <div className={BurgerIngredientsStyles.burgerIngredients__ingredients}>
                        <h3 className="text text_type_main-medium">Соусы</h3>

                        <ul className={BurgerIngredientsStyles.burgerIngredients__list}>
                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Соус Spicy-X" image="https://code.s3.yandex.net/react/code/sauce-02.png" price={30} />
                            </li>

                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Соус фирменный Space Sauce" image="https://code.s3.yandex.net/react/code/sauce-04.png" price={30} />
                            </li>

                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Соус традиционный галактический" image="https://code.s3.yandex.net/react/code/sauce-03.png" price={30} count={1} />
                            </li>

                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Соус с шипами Антарианского плоскоходца" image="https://code.s3.yandex.net/react/code/sauce-01.png" price={30} />
                            </li>
                        </ul>
                    </div>

                    <div className={BurgerIngredientsStyles.burgerIngredients__ingredients}>
                        <h3 className="text text_type_main-medium">Начинки</h3>

                        <ul className={BurgerIngredientsStyles.burgerIngredients__list}>
                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Филе Люминесцентного тетраодонтимформа" image="https://code.s3.yandex.net/react/code/meat-03.png" price={300} count={1} />
                            </li>

                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Кристаллы марсианских альфа-сахаридов" image="https://code.s3.yandex.net/react/code/core.png" price={300} count={1} />
                            </li>

                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Хрустящие минеральные кольца" image="https://code.s3.yandex.net/react/code/mineral_rings.png" price={300} count={1} />
                            </li>

                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Мини-салат Экзо-Плантаго" image="https://code.s3.yandex.net/react/code/salad.png" price={300} count={1} />
                            </li>

                            <li className={BurgerIngredientsStyles.burgerIngredients__item}>
                                <Ingredient name="Мини-салат Экзо-Плантаго" image="https://code.s3.yandex.net/react/code/salad.png" price={300} count={1} />
                            </li>
                        </ul>
                    </div>  
                </div>
            </div>

        </div>
    );
}

export default BurgerIngredients;