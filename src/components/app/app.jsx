import React from 'react';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import styles from './app.module.css';

function App() {

    return (
        <div className={`app`}>
            <AppHeader />

            <DndProvider backend={HTML5Backend}>
                <main className={styles.app__main}>
                    <h1 className={`visually-hidden`}>
                        Главная страница сайта Stellar Burgers
                    </h1>

                    <section className={styles.app__section}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </section>
                </main>
            </DndProvider>
        </div>
    );
}

export default App;
