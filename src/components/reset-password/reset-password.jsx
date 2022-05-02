import React, { useState } from 'react';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory ,Link, Redirect } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/actions/auth';

import styles from './reset-password.module.css';

export default function ResetPassword() {
    const history = useHistory();
    const prevPathname = history.location.state;

    const dispatch = useDispatch();

    const [formValue, setValue] = useState({ password: '', token: '' });

    const handleChange = e => {
        setValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((formValue.password === '') || formValue.token === '') {
            return
        } else {
            dispatch(resetPassword(formValue.password, formValue.token));
        };
    }

    if (localStorage.refreshToken) return <Redirect to={'/'} />;

    if (!prevPathname) history.push('/forgot-password');

    return (
        <div className={styles.reset__conteiner}>
            <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>

            <form onSubmit={handleSubmit}>
                <div className={`mt-6`}>
                    <PasswordInput name={'password'} value={formValue.password} onChange={handleChange} />
                </div>

                <div className={`mt-6`}>
                    <Input
                        type={'text'}
                        name={'token'}
                        placeholder={'Введите код из письма'}
                        value={formValue.token}
                        onChange={handleChange}
                    />
                </div>

                <div className={`mt-6`}>
                    <Button type='primary' size='medium'>Сохранить</Button>
                </div>
            </form>

            <p className={`text text_type_main-small text_color_inactive mt-20`}>
                Вспомнили пароль? <Link to='/login' className={styles.reset__link}>Войти</Link>
            </p>
        </div>
    );
}