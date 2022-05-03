import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

function NavItem({ icon, linkTo, exact, children }) {

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
}

NavItem.propTypes = {
    linkTo: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
}

function AppHeader() {
    return (
        <header className={styles.appheader}>
            <div className={styles.appheader__content}>
                <Link to={'/'} className={styles.appheader__logo}>
                    <Logo />
                </Link>

                <nav className={styles.appheader__nav}>
                    <ul className={styles.appheader__list}>
                        <NavItem icon={<BurgerIcon />} linkTo={'/'}>
                            Конструктор
                        </NavItem>

                        <NavItem icon={<ListIcon />} linkTo={'/feed'}>
                            Лента заказов
                        </NavItem>
                    </ul>

                    <ul className={styles.appheader__list}>
                        <NavItem icon={<ProfileIcon />} linkTo={'/profile'}>
                            Личный кабинет
                        </NavItem>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;