import { CSSProperties, FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

const styleHome: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: 40,
    margin: '0 auto',
    height: 'calc(100vh - 120px)',
    width: 1280
};

export const HomePage: FC =() => {

    return (
        <>
           <DndProvider backend={HTML5Backend}>
                <h1 className={`visually-hidden`}>
                    Главная страница сайта Stellar Burgers
                </h1>

                <section style={styleHome}>
                    <BurgerIngredients />
                    <BurgerConstructor/>
                </section>
            </DndProvider>
        </>
    );
};
