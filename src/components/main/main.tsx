import React from "react";
import MainStyles from './main.module.css';
import BurgerIngredients from './burger-ingredients/burger-ingredients';

class Main extends React.Component {
    render() {
        return (
            <main className={MainStyles.main}>
                <section className={MainStyles.section}>
                    <BurgerIngredients/>
                </section>
            </main>
        );
    }
}

export default Main;