import React from "react";
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { data } from "../../utils/data";

function App() {
  const ingredients = [...data];
  
  return (
    <div className="App">
      <AppHeader />
      <main className={appStyles.app__main}>
          <h1 className="visually-hidden">Главная страница сайта Stellar Burgers</h1>
          <BurgerIngredients items={ingredients} />
      </main>
    </div>
  );
}

export default App;
