import React from "react";

import burgerIngredientsStyles from './burger-ingredients.module.css';

import PropTypes from 'prop-types';

import { itemPropTypes } from "../../utils/types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import Ingredient from "./ingredient";
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';

function Ingredients({ tabId, name, children }) {
    return (
        <div className={burgerIngredientsStyles.ingredients}>
            <h3 className="text text_type_main-medium" id={tabId}>
                {name}
            </h3>

            <ul className={burgerIngredientsStyles.list}>
                {children}
            </ul>
        </div>
    )
}

Ingredients.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    tabId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

function BurgerIngredients({items}) {
    const [currentTab, setCurrentTab] = React.useState('булки');
    const [isOpenModal, setIsOpenModal] = React.useState(false);

    const tabClickHandler = (tab) => {
        const element = document.getElementById(tab);

        setCurrentTab(tab);
       
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        };
    };

    const handleOpenModal = () => {
        setIsOpenModal(true);
      }

    const handleCloseModal = () => {
        setIsOpenModal(false);
    }

    // временное решение для отображения счетчиков у ингридиентов
    const getRandom = function (min, max) {
        const lower = Math.ceil(Math.min((min), (max)));
        const upper = Math.floor(Math.max((min), (max)));
        const result = Math.random() * (upper - lower + 1) + lower;
        return Math.floor(result);
    };

    return (
        <section className={burgerIngredientsStyles.section}>
            <div className={burgerIngredientsStyles.column}>
                <h2 className="visually-hidden">Конструктор бургеров</h2>
                <p className="text text_type_main-large mt-5 pt-5">Собери бургер</p>

                <div className={burgerIngredientsStyles.tabs}>
                    <Tab value="buns" active={currentTab === 'buns'} onClick={tabClickHandler}>
                        Булки
                    </Tab>

                    <Tab value="sauces" active={currentTab === 'sauces'} onClick={tabClickHandler}>
                        Соусы
                    </Tab>

                    <Tab value="mains" active={currentTab === 'mains'} onClick={tabClickHandler}>
                        Начинки
                    </Tab>
                </div>

                <div className={burgerIngredientsStyles.scrollWrapper}>
                    <div className={burgerIngredientsStyles.wrap}>
                        <Ingredients tabId="buns" name="Булки">
                            {items.map(item => item.type === 'bun' && (
                                <Ingredient 
                                    className={burgerIngredientsStyles.item} 
                                    name={item.name} 
                                    image={item.image} 
                                    price={item.price} 
                                    key={item._id} 
                                    count={item.name === 'Краторная булка N-200i' ? 1 : 0}
                                    onClick={handleOpenModal}
                                />)
                            )}
                        </Ingredients>

                        <Ingredients tabId="sauces" name="Соусы">
                            {items.map(item => item.type === 'sauce' && (
                                <Ingredient 
                                    className={burgerIngredientsStyles.item} 
                                    name={item.name} 
                                    image={item.image} 
                                    price={item.price} 
                                    key={item._id}
                                    count={getRandom(0, 1)}
                                    onClick={handleOpenModal}
                                />)
                            )}
                        </Ingredients>

                        <Ingredients tabId="mains" name="Начинки">
                            {items.map(item => item.type === 'main' && (
                                <Ingredient 
                                    className={burgerIngredientsStyles.item} 
                                    name={item.name} 
                                    image={item.image} 
                                    price={item.price} 
                                    key={item._id}
                                    count={getRandom(0, 1)}
                                    onClick={handleOpenModal}
                                />)
                            )}
                        </Ingredients>
                    </div>
                </div>

                <Modal header={'Детали ингредиента'} isOpen={isOpenModal} onClose={handleCloseModal}>
                    Hello world!
                </Modal>
            </div>
            
            <BurgerConstructor items={items} />
        </section>
    );
}

BurgerIngredients.propTypes = {
   items: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired
};

export default BurgerIngredients;