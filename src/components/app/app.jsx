import React, { useState, useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { IngredientsContext } from '../../services/ingredients-context';
import { getData } from '../../api/api';

import styles from './app.module.css';

function App() {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        ingredients: [],
    });

    useEffect(() => {
        getData()
            .then(res => {
                setState({ ...state, hasError: false, isLoading: false });

                if(res && res.success) {
                    setState({ ...state, ingredients: res.data, isLoading: false })
                }
            })
            .catch(e => console.log(e));
        // eslint-disable-next-line
    }, [state.isLoading]);

    const dataIngredients = state.ingredients;

    return (
        <div className={`app`}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={styles.app__main}>
                    <h1 className={`visually-hidden`}>
                        Главная страница сайта Stellar Burgers
                    </h1>
                    {dataIngredients.length > 0 && (
                        <section className={styles.app__section}>
                            <IngredientsContext.Provider value={{ dataIngredients }}>
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </IngredientsContext.Provider>
                        </section>
                    )}
                </main>
            </DndProvider>
        </div>
    );
}

export default App;
