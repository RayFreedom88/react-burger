// import React from 'react';
import AppHeader from '../app-header/app-header';
import './App.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { data } from "../../utils/data";

function App() {
  const ingredients = [...data];
  console.log(ingredients);
  
  return (
    <div className="App">
      <AppHeader />
      <main className='main'>
          <h1 className="visually-hidden">Главная страница сайта Stellar Burgers</h1>
          <section className='main__section'>
            <BurgerIngredients />
            <BurgerConstructor />
          </section>
      </main>
    </div>
  );
}

export default App;
