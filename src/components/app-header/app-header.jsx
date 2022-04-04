import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


function AppHeader() {
    return (
        <header className={styles.appheader}>
            <div className={styles.appheader__content}>
                <div className={styles.appheader__logo}>
                    <Logo />
                </div>

                <nav className={styles.appheader__nav}>
                    <ul className={styles.appheader__list}>
                        <li>
                            <span className={styles.appheader__link}>
                                <BurgerIcon type='primary' />
                                <p className='text text_type_main-default ml-2'>Конструктор</p>
                            </span>
                        </li>

                        <li>
                            <span className={styles.appheader__link}>
                                <ListIcon type='secondary' />
                                <p className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</p>
                            </span>
                        </li>
                    </ul>

                    <ul className={styles.appheader__list}>
                        <li>
                            <span className={styles.appheader__link}>
                                <ProfileIcon type='secondary' />
                                <p className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</p>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;