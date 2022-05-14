import React, { useState, useRef, FC, SyntheticEvent, FocusEvent } from 'react';

import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { register } from '../../services/actions/auth';
import { TState, TLocation } from '../../utils/types';

import styles from './register.module.css';

const Register: FC = () => {
    const { state } = useLocation<TLocation>();

    const dispatch = useDispatch();
    const { loggedIn } = useSelector<TState, { loggedIn: boolean }>((store) => store.auth);

    const [formValue, setFormValue] = useState({
        name: '',
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
        if (formValue.name === '') return setIsNameError(true);;

        if (!validateEmail(formValue.email)) return setIsMailError(true);

        if (formValue.password.length <= 5) {
            return alert('Некорректный пароль')
        } 
        dispatch(register(formValue.email, formValue.password, formValue.name));
    };

    // Валидация

    const inputRef = useRef(null);
    const [isNameError, setIsNameError] = useState(false);
    const [isMailError, setIsMailError] = useState(false);

    const handleNameFocus = () => {
        setIsNameError(false);
    };

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
        <div className={styles.register__conteiner}>
            <h1 className={`text text_type_main-medium`}>Регистрация</h1>

            <form onSubmit={handleSubmit} >

                <div className='mt-6'>
                    <Input 
                        type={'text'}
                        name={'name'}
                        placeholder={'Имя'}
                        value={formValue.name}
                        errorText={'Ой, произошла ошибка!'} 
                        error={isNameError}
                        onFocus={handleNameFocus}
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-6'>
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

                <div className='mt-6'>
                    <PasswordInput
                        name={'password'}
                        value={formValue.password}
                        onChange={handleChange}
                    />
                </div>

                <div className='mt-6'>
                    <Button type={'primary'} size={'medium'}>Зарегистрироваться</Button>
                </div>
            </form>

            <p className={`text text_type_main-small text_color_inactive mt-20`}>
                Уже зарегистрированы? <Link to='/login' className={styles.register__link}>Войти</Link>
            </p>
        </div>
    );
};

export default Register;