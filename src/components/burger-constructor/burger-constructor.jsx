import React, { useState, useMemo, useEffect } from 'react';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from './order-details';

import { useDispatch, useSelector } from 'react-redux';
import {
    ADD_SELECTED_INGREDIENT,
    ADD_SELECTED_BUN,
    getOrder
} from '../../services/actions/ingredients';

import styles from './burger-constructor.module.css';

function BurgerConstructor() {
    const dispatch = useDispatch();

    const allIngredients = useSelector(state => state.ingredients.allIngredients);

    const { ingredients, bun } = useSelector(state => state.ingredients.selected);

    const buns = useMemo(() => allIngredients.filter(item => item.type === 'bun'), [allIngredients]);
    const otherItems = useMemo(() => allIngredients.filter(item => item.type !== 'bun'), [allIngredients]);

    const addIngredient = (ingredientId) => {
        const type = allIngredients.find(item => item._id === ingredientId._id).type;

        if (type === 'bun') {
            dispatch({
                type: ADD_SELECTED_BUN,
                id: ingredientId._id
            });
        } else {
            dispatch({
                type: ADD_SELECTED_INGREDIENT,
                id: ingredientId._id
            });
        }
    };

    // временное решение для заполнения конструктора
    useEffect(() => {
        if (allIngredients.length) {
            addIngredient(buns[0]);
            otherItems.slice(3, 8).map(item => {
                return addIngredient(item);
            })
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [allIngredients]
    );

    // Modal (OrderDetails)

    const order = useSelector(state => state.ingredients.order);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        dispatch(
            getOrder([...ingredients, bun, bun])
        );

        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    // Total price

    const getTotalPrice = useMemo(() => {
        let totalPrice = 0;

        if (ingredients.length > 0) ingredients
            .map(item => totalPrice += allIngredients.find(product => item === product._id)
                .price);

        if (bun != null) {
            totalPrice += 2 * allIngredients.find(product => product._id === bun).price;
        }

        return totalPrice;
    }, [ingredients, bun, allIngredients]);

    if (!allIngredients.length) return null;

    return (
        <div className={styles.burgerconstructor__column}>
            <h2 className={`visually-hidden`}>Лента заказов</h2>
            {(ingredients.length > 0) || bun
                ?
                <>
                    {(bun != null) &&
                        <div className={styles.burgerconstructor__top}>
                            <ConstructorElement
                                type='top'
                                isLocked={true}
                                text={`${buns[0].name} (верх)`}
                                price={buns[0].price}
                                thumbnail={buns[0].image}
                            />
                        </div>
                    }

                    <div className={styles.burgerconstructor__scrollwrapper}>
                        <ul className={styles.burgerconstructor__list}>

                            {(ingredients.length > 0) && otherItems.filter((item) => ingredients.find(product => item._id === product)).map((item, i) => (
                                <li className={styles.burgerconstructor__item} key={i}>
                                    <DragIcon type='primary' />

                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>)
                            )}
                        </ul>
                    </div>

                    {(bun != null) &&
                        <div className={styles.burgerconstructor__bottom}>
                            <ConstructorElement
                                type='bottom'
                                isLocked={true}
                                text={`${buns[0].name} (низ)`}
                                price={buns[0].price}
                                thumbnail={buns[0].image}
                            />
                        </div>
                    }

                    <div className={styles.burgerconstructor__cost}>
                        <p className={`text text_type_digits-medium mt-1 mr-5 mb-1 pr-5`}>
                            <span>{getTotalPrice}</span>&nbsp;
                            <CurrencyIcon type='primary' />
                        </p>

                        <Button type='primary' size='large' onClick={handleOpenModal}>
                            Оформить заказ
                        </Button>
                    </div>
                </>
                :
                <>
                    <div className={'pt-30 pb-30'} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} >
                        <p className={`text text_type_main-medium pb-10 pl-10 pr-10 pt-10`} style={{ textAlign: 'center' }}>
                            Перенесите в эту область ингредиенты для бургера
                        </p>
                    </div>
                </>
            }

            {order &&
                <Modal
                    header={``}
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                >
                    <OrderDetails />
                </Modal>
            }
        </div>
    );
}

export default BurgerConstructor;