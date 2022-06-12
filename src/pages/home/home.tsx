import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import styles from './home.module.css'
import { useSelector } from "../../services/hooks";
import Preloader from "../../components/preloader/preloader";

export const HomePage: FC = () => {
    const { allIngredients, ingredientsRequest } = useSelector(state => state.shop);

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <h1 className={`visually-hidden`}>
                    Главная страница сайта Stellar Burgers
                </h1>

                {
                    ingredientsRequest &&
                    !allIngredients.length && (
                        <Preloader width={1280} height={'calc(100vh - 120px)'} />
                    )
                }

                {
                    !ingredientsRequest &&
                    !!allIngredients.length && (
                        <section className={styles.container}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </section>
                    )
                }

            </DndProvider>
        </>
    );
};
