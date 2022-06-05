import React, { useState, useRef, useEffect, FC, SyntheticEvent } from 'react';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect, Switch, Route, useRouteMatch } from 'react-router-dom';

import { INavBar } from '../../services/types/components';
import OrderList from '../order-list/order-list';
import { useDispatch, useSelector } from '../../services/hooks';
import { logOut, updateUser, getUser } from '../../services/actions/auth';

import styles from './profile.module.css';

const NavBarItem: FC<INavBar> = ({ linkTo, onClick, children }) => {

    return (
        <li>
            <NavLink
                to={linkTo}
                className={styles.profile__link}
                activeClassName={styles.profile__link_active}
                onClick={onClick}
                exact
            >
                <p className={`text_type_main-medium`}>
                    {children}
                </p>
            </NavLink>
        </li>
    )
};

const Profile: FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const { name, email } = useSelector(
        state => state.auth.user
    );
    const { loggedIn } = useSelector(state => state.auth);

    const [formValue, setFormValue] = useState({
        name: name,
        email: email,
        password: ''
    });

    useEffect(
        () => {
            setFormValue({
                name: name,
                email: email,
                password: ''
            });
        },
        [name, email]
    );

    const handleChange = (e: { target: HTMLInputElement }) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();

        setFormValue({
            name: name,
            email: email,
            password: ''
        });
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if ((formValue.name === '') || !validateEmail(formValue.email)) {

            return
        } else {
            dispatch(updateUser(formValue.email, formValue.name));
        };
    };

    const handleLogout = (e: SyntheticEvent) => {
        e.preventDefault();

        dispatch(logOut())
    };

    const handleIconClick = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus()
        }
    };

    // Валидация 
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Определение роута
    const { path } = useRouteMatch();
    const profileMatch = useRouteMatch("/profile");
    const profileOrdersMatch = useRouteMatch("/profile/orders");

    if (!loggedIn) return (<Redirect to='/login' />);

    return (
        <>
            <h1 className={`visually-hidden`}>Личный кабинет</h1>

            <section className={styles.profile__section}>
                <h2 className={`visually-hidden`}>Профиль</h2>

                <div className={styles.profile__navbar}>
                    <ul>
                        <NavBarItem linkTo={'/profile'}>
                            Профиль
                        </NavBarItem>

                        <NavBarItem linkTo={'/profile/orders'}>
                            История заказов
                        </NavBarItem>

                        <NavBarItem linkTo={'/'} onClick={handleLogout}>
                            Выход
                        </NavBarItem>
                    </ul>

                    {profileMatch?.isExact &&
                        <p className={`${styles.profile__text} text text_type_main-small text_color_inactive mt-20`}>
                            В этом разделе вы можете изменить свои персональные данные
                        </p>
                    }

                    {profileOrdersMatch?.isExact &&
                        <p className={`${styles.profile__text} text text_type_main-small text_color_inactive mt-20`}>
                            В этом разделе вы можете посмотреть свои заказы
                        </p>
                    }
                </div>

                <Switch>
                    <Route path={`${path}`} exact={true}>
                        <div className={styles.profile__wrap}>
                            <form onSubmit={handleSubmit} >
                                <div className='mt-0'>
                                    <Input
                                        type={'text'}
                                        placeholder={'Имя'}
                                        name='name'
                                        value={formValue.name}
                                        icon={'EditIcon'}
                                        ref={inputRef}
                                        onIconClick={handleIconClick}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mt-6">
                                    <EmailInput
                                        name='email'
                                        value={formValue.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='mt-6'>
                                    <PasswordInput
                                        name={'password'}
                                        value={formValue.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={`${styles.profile__buttons} mt-6`}>
                                    <Button type='secondary' size='medium' onClick={handleCancel}>
                                        Отмена
                                    </Button>

                                    <Button type='primary' size='medium'>
                                        Сохранить
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Route>
                    
                    <Route path={`${path}/orders`} exact={true}>
                        <OrderList />
                    </Route>
                </Switch>
            </section>
        </>
    );
};

export default Profile;
