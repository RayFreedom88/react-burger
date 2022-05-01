import React, { useState, useRef } from 'react';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';

import { useDispatch } from "react-redux";
import { logIn } from '../../services/actions/auth';

import styles from './auth.module.css';

export default function Auth() {
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    console.log(formValue)

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        if (!validateEmail(formValue.email)) return setIsMailError(true);

        if (formValue.password.length <= 5) {
            return alert('Некорректный пароль')
        }

        dispatch(logIn(formValue.email, formValue.password));
    }

    // Валидация    

    const inputRef = useRef(null);
    const [isMailError, setIsMailError] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateField = (value) => {
        setIsMailError(!validateEmail(value));
    };

    const handleMailFocus = () => {
        setIsMailError(false);
    };

    const handleMailBlur = (e) => {
        if (e.target.value) {
            validateField(e.target.value);
        } else {
            setIsMailError(false);
        };
    };

    if (localStorage.refreshToken) return <Redirect to={'/'} />;

    return (
        <div className={styles.auth__conteiner}>
            <h1 className={`text text_type_main-medium`}>Вход</h1>

            <form onSubmit={handleSubmit}>
                <div className={`mt-6`}>
                    <Input
                        type={'email'}
                        name={'email'}
                        placeholder={'E-mail'}
                        value={formValue.email}
                        errorText={'Ой, произошла ошибка!'}
                        error={isMailError}
                        ref={inputRef}
                        onBlur={handleMailBlur}
                        onFocus={handleMailFocus}
                        onChange={handleChange}
                    />
                </div>

                <div className={`mt-6`}>
                    <PasswordInput
                        name={'password'}
                        value={formValue.password}
                        onChange={handleChange}
                    />
                </div>

                <div className={`mt-6`}>
                    <Button type='primary' size='medium'>Войти</Button>
                </div>
            </form>

            <p className={`text text_type_main-small text_color_inactive mt-20`}>
                Вы — новый пользователь? <Link to='/register' className={styles.auth__link}>Зарегистрироваться</Link>
            </p>

            <p className={`text text_type_main-small text_color_inactive mt-4`}>
                Забыли пароль? <Link to='/forgot-password' className={styles.auth__link}>Восстановить пароль</Link>
            </p>
        </div>
    )
}