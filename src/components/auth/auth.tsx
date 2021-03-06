import React, { useState, useRef, FC, SyntheticEvent, FocusEvent } from 'react';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link, Redirect } from 'react-router-dom';

import { logIn } from '../../services/actions/auth';
import { TLocation } from '../../services/types/types';

import styles from './auth.module.css';
import { useDispatch, useSelector } from '../../services/hooks';

const Auth: FC = () => {
    const dispatch = useDispatch();
    const { loggedIn } = useSelector(state => state.auth);
    const { state } = useLocation<TLocation>();

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: { target: HTMLInputElement}) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: SyntheticEvent) => {
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

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateField = (value: string) => {
        setIsMailError(!validateEmail(value));
    };

    const handleMailFocus = () => {
        setIsMailError(false);
    };

    const handleMailBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (e.target.value) {
            validateField(e.target.value);
        } else {
            setIsMailError(false);
        };
    };

    if (loggedIn) return <Redirect to={state?.from || '/'} />;

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
};

export default Auth;
