import AppHeader from '../app-header/app-header';
import AppStyles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { data } from "../../utils/data";

function App() {
  const ingredients = [...data];
  
  return (
    <div className="App">
      <AppHeader />
      <main className={AppStyles.app__main}>
          <h1 className="visually-hidden">Главная страница сайта Stellar Burgers</h1>
          <section className={AppStyles.app__section}>
            <BurgerIngredients items={ingredients} />
            <BurgerConstructor />
          </section>
      </main>
    </div>
  );
}

export default App;
