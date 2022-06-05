import React, { useState, useRef, SyntheticEvent, FocusEvent, FC } from 'react';
import { useLocation, useHistory, Link, Redirect } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from '../../services/hooks';
import { forgotPassword } from '../../services/actions/auth';
import { TLocation } from '../../services/types/types';

import styles from './forgot-password.module.css';

const ForgotPassword: FC = () => {
    const { state } = useLocation<TLocation>();
    
    const dispatch = useDispatch();
    const { loggedIn } = useSelector(state => state.auth);

    const [formValue, setFormValue] = useState({ email: '' });

    const handleChange = (e: {target: HTMLInputElement}) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value});
    };

    const history = useHistory();

    // временное решение
    const redirect = () => {
        history.push('/reset-password', { prevPathname: history.location.pathname })
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (formValue.email === '') {
            return
        } else {
            dispatch(forgotPassword(formValue.email));
            redirect();
        };
    };

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
        <div className={styles.forgot__conteiner}>
            <h1 className={`text text_type_main-medium`}>Восстановление пароля</h1>

            <form onSubmit={handleSubmit}>
                <div className={`mt-6`}>
                    <Input
                        type={'email'}
                        name={'email'}
                        placeholder={'Укажите e-mail'}
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
                    <Button type='primary' size='medium'>Восстановить</Button>
                </div>
            </form>

            <p className={`text text_type_main-small text_color_inactive mt-20`}>
                Вспомнили пароль? <Link to='/login' className={styles.forgot__link}>Войти</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;
