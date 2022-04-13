import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './ingredient';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';

import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';

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
}

Ingredients.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
    ]),
    tabId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

function BurgerIngredients() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getItems());
    },
        [dispatch]
    );

    const allIngredients = useSelector(state => state.ingredients.allIngredients);

    const getIngredient = (item) => {
      
        return (
            <Ingredient
                className={styles.burgeringredients__item}
                item={item}
                key={item._id}
                onClick={() => { handleOpenModal(item) }}
            />
        )
    };

    const buns = useMemo(() => allIngredients.filter((item) => item.type === 'bun'), [allIngredients]);
    const sauces = useMemo(() => allIngredients.filter((item) => item.type === 'sauce'), [allIngredients]);
    const mains = useMemo(() => allIngredients.filter((item) => item.type === 'main'), [allIngredients]);

    // Tabs

    const [currentTab, setCurrentTab] = useState('булки');

    const tabClickHandler = (tab) => {
        const element = document.getElementById(tab);

        setCurrentTab(tab);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        };
    };

    // Modal

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalData, setModalData] = useState();

    const handleOpenModal = (data) => {
        setIsOpenModal(true);
        setModalData(data);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    if (!allIngredients.length) return null;

    return (
        <div className={styles.burgeringredients__column}>
            <h2 className={`visually-hidden`}>Конструктор бургеров</h2>
            <p className={`text text_type_main-large mt-5 pt-5`}>Собери бургер</p>

            <div className={styles.burgeringredients__tabs}>
                <Tab value='buns' active={currentTab === 'buns'} onClick={tabClickHandler}>
                    Булки
                </Tab>

                <Tab value='sauces' active={currentTab === 'sauces'} onClick={tabClickHandler}>
                    Соусы
                </Tab>

                <Tab value='mains' active={currentTab === 'mains'} onClick={tabClickHandler}>
                    Начинки
                </Tab>
            </div>

            <div className={styles.burgeringredients__scrollwrapper}>
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
                <IngredientDetails ingredient={modalData} />
            </Modal>
        </div>
    );
}

export default BurgerIngredients;