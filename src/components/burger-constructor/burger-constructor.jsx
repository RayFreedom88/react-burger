import React from "react";
import PropTypes from 'prop-types';
import BurgerConstructorStyles from './burger-constructor.module.css';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor ({items}) {
    const buns = items.filter(item => item.type === 'bun');

    return (
        <div className={BurgerConstructorStyles.burgerConstructor}>
            <h2 className="visually-hidden">Лента заказов</h2>

            <div className={BurgerConstructorStyles.top}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${buns[0].name} (верх)`}
                    price={buns[0].price}
                    thumbnail={buns[0].image}
                />
            </div>

            <div className={BurgerConstructorStyles.scrollWrapper}>
                <ul className={BurgerConstructorStyles.list}>
                    {items.map(item => item.type !== 'bun' ? (
                        <li className={BurgerConstructorStyles.item} key={item._id}>
                            <DragIcon type="primary" />

                            <ConstructorElement
                                text={item.name} 
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>) : (null)
                    )}
                </ul>
            </div>

            <div className={BurgerConstructorStyles.bottom}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${buns[0].name} (низ)`}
                    price={buns[0].price}
                    thumbnail={buns[0].image}
                />
            </div>

            <div className={BurgerConstructorStyles.cost}>
                <p className="text text_type_digits-medium mt-1 mr-5 mb-1 pr-5">
                    <span>600</span>&nbsp;
                    <CurrencyIcon type="primary" />
                </p>

                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}

BurgerConstructor.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object.isRequired)
};

export default BurgerConstructor;