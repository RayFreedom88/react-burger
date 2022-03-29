import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./ingredient";
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import { itemPropTypes } from "../../utils/types";
import styles from './burger-ingredients.module.css';

 // временное решение для отображения счетчиков у ингридиентов
 const getRandom = function (min, max) {
    const lower = Math.ceil(Math.min((min), (max)));
    const upper = Math.floor(Math.max((min), (max)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
};
function Ingredients({ tabId, name, children }) {
    return (
        <div className={styles.ingredients}>
            <h3 className="text text_type_main-medium" id={tabId}>
                {name}
            </h3>

            <ul className={styles.list}>
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
    const [currentTab, setCurrentTab] = useState('булки');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalData, setModalData] = useState();

    const tabClickHandler = (tab) => {
        const element = document.getElementById(tab);

        setCurrentTab(tab);
       
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        };
    };

    const handleOpenModal = (data) => {
        setIsOpenModal(true);
        setModalData(data);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    const getIngredient = (data) => {
        return (
            <Ingredient 
                className={styles.item} 
                name={data.name} 
                image={data.image} 
                price={data.price} 
                key={data._id} 
                count={getRandom(0, 1)}
                onClick={() =>{handleOpenModal(data)}}
            />
        )
    };

    return (
        <section className={styles.section}>
            <div className={styles.column}>
                <h2 className="visually-hidden">Конструктор бургеров</h2>
                <p className="text text_type_main-large mt-5 pt-5">Собери бургер</p>

                <div className={styles.tabs}>
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

                <div className={styles.scrollWrapper}>
                    <div className={styles.wrap}>
                        <Ingredients tabId="buns" name="Булки">
                            {items.map(item => item.type === 'bun' && getIngredient(item))}
                        </Ingredients>

                        <Ingredients tabId="sauces" name="Соусы">
                            {items.map(item => item.type === 'sauce' && getIngredient(item))}
                        </Ingredients>

                        <Ingredients tabId="mains" name="Начинки">
                            {items.map(item => item.type === 'main' && getIngredient(item))}
                        </Ingredients>
                    </div>
                </div>
                
                <Modal 
                    header={'Детали ингредиента'} 
                    isOpen={isOpenModal} 
                    onClose={handleCloseModal}
                >
                    <IngredientDetails ingredient={modalData} />
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