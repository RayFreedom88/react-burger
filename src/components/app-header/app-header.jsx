import React from "react";
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';



class AppHeader extends React.Component {
    render() {
        return (
            <header className={appHeaderStyles.header}>
                <div className={appHeaderStyles.content}>
                    <div className={appHeaderStyles.logo}>
                        <Logo />
                    </div>
                    
                    <nav className={appHeaderStyles.nav}>
                        <ul className={appHeaderStyles.list}>
                            <li>
                                <span className={appHeaderStyles.link}>
                                    <BurgerIcon type="primary" />
                                    <p className="text text_type_main-default ml-2">Конструктор</p>
                                </span>
                            </li>
                            
                            <li>
                                <span className={appHeaderStyles.link}>
                                    <ListIcon type="secondary" />
                                    <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                                </span>
                            </li>
                        </ul>

                        <ul className={appHeaderStyles.list}>
                            <li>
                                <span className={appHeaderStyles.link}>
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
}

export default AppHeader;