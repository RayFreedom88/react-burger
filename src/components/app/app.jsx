import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ state, setState ] = useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  });

  const getIngredients = async () => {
    setState({...state, hasError: false, isLoading: false })
    fetch(URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .then(data => setState({...state, ingredients: data.data, isLoading: false }))
      .catch(e => console.log(e));
  };

  useEffect(() => {
    getIngredients();
    // eslint-disable-next-line
  }, []);

  const dataIngredients = state.ingredients;
  
  return (
    <div className={`app`}>
      <AppHeader />
      <main className={styles._main}>
          <h1 className="visually-hidden">Главная страница сайта Stellar Burgers</h1>
          {dataIngredients.length > 0 && <BurgerIngredients items={dataIngredients} />}
      </main>
    </div>
  );
}

export default App;
