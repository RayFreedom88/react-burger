import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

import styles from './profile.module.css';

function NavBarItem({ linkTo, onClick, children }) {

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
}

NavBarItem.propTypes = {
    linkTo: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.string.isRequired
}

export default function Profile() {
    const history = useHistory();
    const inputRef = useRef(null);
    
    const { name, email } = useSelector(
        state => state.auth.user
    );

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

    const handleChange = (e) => {
        setFormValue({ 
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();

        setFormValue({
            name: name,
            email: email,
            password: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((formValue.name === '') || formValue.email === '') {

            return
        } else {
            console.log('Сохранить')
        };
    };

    const redirect = () => {
        history.push('/login')
      };

    const handleLogout = e => {
        e.preventDefault();
        console.log('выход');
        redirect();
    };

    const handleIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    };

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
}
