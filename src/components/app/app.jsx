
import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage,  NotFound404 } from '../../pages';
import AppHeader from '../app-header/app-header';

import styles from './app.module.css';

function App() {

    return (
        <div className={`app`}>
            <Router>
                <AppHeader />

                <main className={styles.app__main}>
                    <Switch>
                        <Route path='/' exact={true}>
                            <HomePage />
                        </Route>

                        <Route path='/login' exact={true}>
                            <LoginPage />
                        </Route>

                        <Route path='/register' exact={true}>
                            <RegisterPage />
                        </Route>

                        <Route path='/forgot-password' exact={true}>
                            <ForgotPasswordPage />
                        </Route>

                        <Route>
                            <NotFound404 />
                        </Route>
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

export default App;
