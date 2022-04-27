import React, { useState } from 'react';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './reset-password.module.css';

export default function ResetPassword() {
    const [form, setValue] = useState({ code: '', password: '' });

    const handleChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // здесь будет (диспатч) обновление стейта 
    }

    return (
        <div className={styles.reset__conteiner}>
            <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>

            <form onSubmit={handleSubmit}>
                <div className={`mt-6`}>
                    <PasswordInput name={'password'} value={form.password} onChange={handleChange} />
                </div>

                <div className={`mt-6`}>
                    <Input
                        type={'text'}
                        name={'code'}
                        placeholder={'Введите код из письма'}
                        value={form.code}
                        onChange={handleChange}
                    />
                </div>

                <div className={`mt-6`}>
                    <Button type='primary' size='medium'>Восстановить</Button>
                </div>
            </form>

            <p className={`text text_type_main-small text_color_inactive mt-20`}>
                Вспомнили пароль? <Link to='/login' className={styles.reset__link}>Войти</Link>
            </p>
        </div>
    );
}