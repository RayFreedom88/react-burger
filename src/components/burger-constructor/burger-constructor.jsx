import React from "react";
import BurgerConstructorStyles from './burger-constructor.module.css';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor () {
    return (
        <div className={BurgerConstructorStyles.burgerConstructor}>
            <h2 className="visually-hidden">Лента заказов</h2>

            <div className={BurgerConstructorStyles.burgerConstructor__scrollWrapper}>
                <ul className={BurgerConstructorStyles.burgerConstructor__list}>
                    <li className={BurgerConstructorStyles.burgerConstructor__item}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                    </li>

                    <li className={BurgerConstructorStyles.burgerConstructor__item}>
                        <DragIcon type="primary" />

                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                    </li>

                    <li className={BurgerConstructorStyles.burgerConstructor__item}>
                        <DragIcon type="primary" />

                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                    </li>

                    <li className={BurgerConstructorStyles.burgerConstructor__item}>
                        <DragIcon type="primary" />

                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                    </li>

                    <li className={BurgerConstructorStyles.burgerConstructor__item}>
                        <DragIcon type="primary" />

                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                    </li>

                    <li className={BurgerConstructorStyles.burgerConstructor__item}>
                        <DragIcon type="primary" />

                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                    </li>
                    
                    <li className={BurgerConstructorStyles.burgerConstructor__item}>
                        <DragIcon type="primary" />

                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                    </li>

                    <li className={BurgerConstructorStyles.burgerConstructor__item}>
                        <DragIcon type="primary" />

                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                    </li>

                    <li className={BurgerConstructorStyles.burgerConstructor__item}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={200}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                    </li>
                </ul>
            </div>

            <div className={BurgerConstructorStyles.burgerConstructor__cost}>
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

export default BurgerConstructor;