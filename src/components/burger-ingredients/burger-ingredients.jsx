import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredient from './ingredient';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';

import { useSelector, useDispatch } from 'react-redux';
import {
    getItems,
    ADD_INGREDIENT_MODAL,
    DELETE_INGREDIENT_MODAL
} from '../../services/actions/shop';

import styles from './burger-ingredients.module.css';

function Ingredients({ tabId, name, children }) {

    return (
        <div className={styles.burgeringredients__ingredients}>
            <h3 className={`text text_type_main-medium`} id={tabId}>
                {name}
            </h3>

            <ul className={styles.burgeringredients__list}>
                {children}
            </ul>
        </div>
    )
};

Ingredients.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
    ]),
    tabId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

function BurgerIngredients() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems());
    },
        [dispatch]
    );

    const allIngredients = useSelector(state => state.shop.allIngredients);

    const getIngredient = (item) => {

        return (
            <Ingredient
                className={styles.burgeringredients__item}
                product={item}
                key={item._id}
                onClick={() => { handleOpenModal(item) }}
            />
        )
    };

    const buns = useMemo(() => allIngredients.filter((item) => item.type === 'bun'), [allIngredients]);
    const sauces = useMemo(() => allIngredients.filter((item) => item.type === 'sauce'), [allIngredients]);
    const mains = useMemo(() => allIngredients.filter((item) => item.type === 'main'), [allIngredients]);

    // Tabs

    const [currentTab, setCurrentTab] = useState('buns');

    const handleClickTab = (tab) => {
        const element = document.getElementById(tab);

        setCurrentTab(tab);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        };
    };

    const handleSrollWrapper = () => {
        const tabs = ['buns', 'sauces', 'mains'];
        const headTabs = tabs.map((id) => document.getElementById(id))
        const scrollPosition = document.getElementById('scrollwrapper').scrollTop;

        headTabs.forEach((head, index) => {
            const headPosition = head.offsetTop;

            if (headPosition <= scrollPosition + 340 && headPosition >= scrollPosition - 340) {
                setCurrentTab(tabs[index]);
            }
        })
    }

    // Modal (IngredientDetails)

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = (data) => {
        setIsOpenModal(true);

        dispatch({
            type: ADD_INGREDIENT_MODAL,
            ingredient: data
        });
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);

        dispatch({
            type: DELETE_INGREDIENT_MODAL,
        });
    };

    if (!allIngredients.length) return null;

    return (
        <div className={styles.burgeringredients__column}>
            <h2 className={`visually-hidden`}>Конструктор бургеров</h2>
            <p className={`text text_type_main-large mt-5 pt-5`}>Собери бургер</p>

            <div className={styles.burgeringredients__tabs}>
                <Tab value='buns' active={currentTab === 'buns'} onClick={handleClickTab}>
                    Булки
                </Tab>

                <Tab value='sauces' active={currentTab === 'sauces'} onClick={handleClickTab}>
                    Соусы
                </Tab>

                <Tab value='mains' active={currentTab === 'mains'} onClick={handleClickTab}>
                    Начинки
                </Tab>
            </div>

            <div className={styles.burgeringredients__scrollwrapper} id='scrollwrapper' onScroll={handleSrollWrapper}>
                <div className={styles.burgeringredients__wrap}>
                    <Ingredients tabId='buns' name='Булки'>
                        {buns.map(getIngredient)}
                    </Ingredients>

                    <Ingredients tabId='sauces' name='Соусы'>
                        {sauces.map(getIngredient)}
                    </Ingredients>

                    <Ingredients tabId='mains' name='Начинки'>
                        {mains.map(getIngredient)}
                    </Ingredients>
                </div>
            </div>

            <Modal
                header={'Детали ингредиента'}
                isOpen={isOpenModal}
                onClose={handleCloseModal}
            >
                <IngredientDetails />
            </Modal>
        </div>
    );
};

export default BurgerIngredients;