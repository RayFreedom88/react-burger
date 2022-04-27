import React, { useState, useRef } from 'react';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './forgot-password.module.css';

export default function ForgotPassword() {
    const [form, setValue] = useState({ email: '' });

    const handleChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // здесь будет (диспатч) обновление стейта 
    }

    // Валидация    

    const inputRef = useRef(null);
    const [isError, setIsError] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateField = (value) => {
        setIsError(!validateEmail(value));
    };

    const handleFocus = () => {
        setIsError(false);
    };

    const handleBlur = (e) => {
        if (e.target.value) {
            validateField(e.target.value);
        } else {
            setIsError(false);
        };
    };

    return (
        <div className={styles.forgot__conteiner}>
            <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>

            <form onSubmit={handleSubmit}>
                <div className={`mt-6`}>
                    <Input
                        type={'email'}
                        name={'email'}
                        placeholder={'Укажите e-mail'}
                        value={form.email}
                        errorText={'Ой, произошла ошибка!'}
                        error={isError}
                        ref={inputRef}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onChange={handleChange}
                    />
                </div>

                <div className={`mt-6`}>
                    <Button type='primary' size='medium'>Восстановить</Button>
                </div>
            </form>

            <p className={`text text_type_main-small text_color_inactive mt-4`}>
                Вспомнили пароль? <Link to='/login' className={styles.forgot__link}>Войти</Link>
            </p>
        </div>
    );
}