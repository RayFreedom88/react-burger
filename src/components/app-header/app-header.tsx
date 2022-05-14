import React, { FC, ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

interface IPropsNavItem {
    linkTo: string;
    icon: ReactNode;
}

const NavItem: FC<IPropsNavItem> = ({ icon, linkTo, children }) => {

    return (
        <li>
            <NavLink 
                to={linkTo} 
                className={styles.appheader__link} 
                activeClassName={styles.appheader__link_active} 
                exact
            >
                {icon}
                <p className='text text_type_main-default ml-2'>
                    {children}
                </p>
            </NavLink>
        </li>
    )
};

const AppHeader: FC = () => {

    return (
        <header className={styles.appheader}>
            <div className={styles.appheader__content}>
                <Link to={'/'} className={styles.appheader__logo}>
                    <Logo />
                </Link>

                <nav className={styles.appheader__nav}>
                    <ul className={styles.appheader__list}>
                        <NavItem icon={<BurgerIcon type="primary"/>} linkTo={'/'}>
                            Конструктор
                        </NavItem>

                        <NavItem icon={<ListIcon type="primary"/>} linkTo={'/feed'}>
                            Лента заказов
                        </NavItem>
                    </ul>

                    <ul className={styles.appheader__list}>
                        <NavItem icon={<ProfileIcon type="primary"/>} linkTo={'/profile'}>
                            Личный кабинет
                        </NavItem>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;