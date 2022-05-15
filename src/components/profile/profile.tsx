import React, { useState, useRef, useEffect, FC, SyntheticEvent } from 'react';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logOut, updateUser, getUser } from '../../services/actions/auth';

import styles from './profile.module.css';
import { TStateAuth } from '../../utils/types';
import { INavBar } from '../../utils/interfaces';

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
    const { name, email } = useSelector<TStateAuth, { name: string, email: string }>(
        state => state.auth.user
    );
    const { loggedIn } = useSelector<TStateAuth, { loggedIn: boolean }>((store) => store.auth);

    const [formValue, setFormValue] = useState({
        name: name,
        email: email,
        password: ''
    });

    useEffect(
        () => {
            dispatch(getUser())
        },
        [dispatch]
    );

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

    const handleChange = (e: { target: HTMLInputElement}) => {
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
        if(inputRef && inputRef.current) {
            inputRef.current.focus()
        }
    };

    // Валидация 

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

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

                    <p className={`${styles.profile__text} text text_type_main-small text_color_inactive mt-20`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>

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
            </section>
        </>
    );
};

export default Profile;
