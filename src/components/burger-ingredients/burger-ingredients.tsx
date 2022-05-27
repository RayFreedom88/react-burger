import React, { useState, useMemo, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from './ingredient';

import { useSelector } from '../../services/hooks';
import { TIngredient } from '../../services/types/types';
import { IIngredients } from '../../services/types/components';

import styles from './burger-ingredients.module.css';

const Ingredients: FC<IIngredients> = ({ tabId, name, children }) => {

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

const BurgerIngredients: FC = () => {
    const allIngredients = useSelector(state => state.shop.allIngredients);

    const getIngredient = (item: TIngredient) => {

        return (
            <Ingredient
                className={styles.burgeringredients__item}
                product={item}
                key={item._id}
            />
        )
    };

    const buns = useMemo(() => allIngredients.filter((item) => item.type === 'bun'), [allIngredients]);
    const sauces = useMemo(() => allIngredients.filter((item) => item.type === 'sauce'), [allIngredients]);
    const mains = useMemo(() => allIngredients.filter((item) => item.type === 'main'), [allIngredients]);

    // Tabs

    const [currentTab, setCurrentTab] = useState('buns');

    const handleClickTab = (tab: string) => {
        const element = document.getElementById(tab);

        setCurrentTab(tab);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        };
    };

    const handleSrollWrapper = () => {
        const tabs = ['buns', 'sauces', 'mains'];
        const headTabs = tabs.map((id) => document.getElementById(id))
        const scrollPosition = document.getElementById('scrollwrapper')!.scrollTop;

        headTabs.forEach((head, index) => {
            const headPosition = head!.offsetTop;

            if (headPosition <= scrollPosition + 340 && headPosition >= scrollPosition - 340) {
                setCurrentTab(tabs[index]);
            }
        })
    }

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
        </div>
    );
};

export default BurgerIngredients;