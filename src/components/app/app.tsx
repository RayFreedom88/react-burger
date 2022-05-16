
import React, { FC, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';

import { ProtectedRoute } from '../protected-route';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientPage, NotFound404 } from '../../pages';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';

import { useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/shop';
import { getUser } from '../../services/actions/auth';
import { TLocation } from '../../utils/types';

import styles from './app.module.css';

const App: FC = () => {
    const ModalSwitch = () => {
        const dispatch = useDispatch();

        const history = useHistory();
        const location = useLocation<TLocation>();
        const background = location.state && location.state.background;

        useEffect(() => {
            dispatch(getItems());
            
            if (localStorage.refreshToken) {
                dispatch(getUser());
            };
        }, [dispatch]);

        const handleCloseModal = () => {
            history.goBack();
        };

        return (
            <div className={`app`}>
                <AppHeader />

                <main className={styles.app__main}>
                    <Switch location={background || location}>
                        <Route path='/' exact={true}>
                            <HomePage />
                        </Route>

                        <Route path='/login'>
                            <LoginPage />
                        </Route>

                        <Route path='/register'>
                            <RegisterPage />
                        </Route>

                        <Route path='/forgot-password'>
                            <ForgotPasswordPage />
                        </Route>

                        <Route path='/reset-password'>
                            <ResetPasswordPage />
                        </Route>

                        <ProtectedRoute path='/profile'>
                            <ProfilePage />
                        </ProtectedRoute>

                        <Route path='/ingredients/:id'>
                            <IngredientPage />
                        </Route>

                        <Route>
                            <NotFound404 />
                        </Route>
                    </Switch>

                    {background && (
                        <Route path='/ingredients/:id'>
                            <Modal
                                header='Детали ингредиента'
                                onClose={handleCloseModal}
                            >
                                <IngredientDetails />
                            </Modal>
                        </Route>
                    )}
                </main>
            </div>
        );
    };

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

export default App;
