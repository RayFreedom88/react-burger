import React from "react";
import AppHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';



class AppHeader extends React.Component {
    render() {
        return (
            <header className={AppHeaderStyles.header}>
                <div className={AppHeaderStyles.content}>
                    <div className={AppHeaderStyles.logo}>
                        <Logo />
                    </div>
                    
                    <nav className={AppHeaderStyles.nav}>
                        <ul className={AppHeaderStyles.list}>
                            <li>
                                <a className={AppHeaderStyles.link_active} href="#">
                                    <BurgerIcon type="primary" />
                                    <p className="text text_type_main-default ml-2">Конструктор</p>
                                </a>
                            </li>
                            
                            <li>
                                <a className={AppHeaderStyles.link} href="#">
                                    <ListIcon type="secondary" />
                                    <p className="text text_type_main-default ml-2">Лента заказов</p>
                                </a>
                            </li>
                        </ul>

                        <ul className={AppHeaderStyles.list}>
                            <li>
                                <a className={AppHeaderStyles.link} href="#">
                                    <ProfileIcon type="secondary" />
                                    <p className="text text_type_main-default ml-2">Личный кабинет</p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default AppHeader;