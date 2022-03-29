import React from "react";
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                
                <nav className={styles.nav}>
                    <ul className={styles.list}>
                        <li>
                            <span className={styles.link}>
                                <BurgerIcon type="primary" />
                                <p className="text text_type_main-default ml-2">Конструктор</p>
                            </span>
                        </li>
                        
                        <li>
                            <span className={styles.link}>
                                <ListIcon type="secondary" />
                                <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                            </span>
                        </li>
                    </ul>

                    <ul className={styles.list}>
                        <li>
                            <span className={styles.link}>
                                <ProfileIcon type="secondary" />
                                <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;