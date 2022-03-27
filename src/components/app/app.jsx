import React from "react";
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ state, setState ] = React.useState({
    isLoading: false,
    hasError: false,
  });

  const getIngredients = async () => {
    setState({...state, hasError: false, isLoading: false })
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .then(data => setState({...state, ingredients: data.data, isLoading: false }))
      .catch(e => console.log(e));
  };

  React.useEffect(() => {
    getIngredients();
    // eslint-disable-next-line
  }, []);

  const dataIngredients = state.ingredients;
  
  return (
    <div className="App">
      <AppHeader />
      <main className={appStyles.app__main}>
          <h1 className="visually-hidden">Главная страница сайта Stellar Burgers</h1>
          {dataIngredients && <BurgerIngredients items={dataIngredients} />}
      </main>
    </div>
  );
}

export default App;
