import React from "react";
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { data } from "../../utils/data";

function App() {
  const ingredients = [...data];
  
  return (
    <div className="App">
      <AppHeader />
      <main className={appStyles.app__main}>
          <h1 className="visually-hidden">Главная страница сайта Stellar Burgers</h1>
          <section className={appStyles.app__section}>
            <BurgerIngredients items={ingredients} />
            <BurgerConstructor items={ingredients} />
          </section>
      </main>
    </div>
  );
}

export default App;
