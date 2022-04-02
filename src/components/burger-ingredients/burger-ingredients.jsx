import React, { useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './ingredient';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import { IngredientsContext } from '../../services/ingredients-context.jsx';
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
    const { dataIngredients } = useContext(IngredientsContext);
    const [currentTab, setCurrentTab] = useState('булки');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalData, setModalData] = useState();

    const tabClickHandler = (tab) => {
        const element = document.getElementById(tab);

        setCurrentTab(tab);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
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
                className={styles.burgeringredients__item}
                name={data.name}
                image={data.image}
                price={data.price}
                key={data._id}
                count={getRandom(0, 1)}
                onClick={() => { handleOpenModal(data) }}
            />
        )
    };

    const buns = useMemo(() => dataIngredients.filter((item) => item.type === 'bun'), [dataIngredients]);
    const sauces = useMemo(() => dataIngredients.filter((item) => item.type === 'sauce'), [dataIngredients]);
    const mains = useMemo(() => dataIngredients.filter((item) => item.type === 'main'), [dataIngredients]);

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