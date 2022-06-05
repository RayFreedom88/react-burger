import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import styles from './home.module.css'

export const HomePage: FC =() => {

    return (
        <>
           <DndProvider backend={HTML5Backend}>
                <h1 className={`visually-hidden`}>
                    Главная страница сайта Stellar Burgers
                </h1>

                <section className={styles.container}>
                    <BurgerIngredients />
                    <BurgerConstructor/>
                </section>
            </DndProvider>
        </>
    );
};
