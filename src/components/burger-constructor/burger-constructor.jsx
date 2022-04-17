import React, { useState, useMemo, useCallback } from 'react';

import { v1 as uuid } from 'uuid';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import ConstructorIngredient from './constructor-ingredient';
import Modal from '../modal/modal';
import OrderDetails from './order-details';

import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import {
    ADD_SELECTED_INGREDIENT,
    ADD_SELECTED_BUN,
    UPDATE_SELECTED_LIST,
    getOrder
} from '../../services/actions/shop';

import styles from './burger-constructor.module.css';

function BurgerConstructor() {
    const dispatch = useDispatch();

    const allIngredients = useSelector(state => state.shop.allIngredients);

    const { ingredients, bun } = useSelector(state => state.shop.selected);

    // dnd

    const moveItem = (item) => {
        const type = allIngredients.find(product => product._id === item.id).type;

        if (type === 'bun') {
            dispatch({
                type: ADD_SELECTED_BUN,
                id: item.id
            });
        } else {
            dispatch({
                type: ADD_SELECTED_INGREDIENT,
                ingredient: { ...item, uid: uuid() }
            });
        }
    };

    const [, dropTargerRef] = useDrop({
        accept: 'item',

        drop(item) {
            moveItem(item)
        },
    });

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = ingredients[dragIndex];
        const newCards = [...ingredients]

        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)

        dispatch({
            type: UPDATE_SELECTED_LIST,
            ingredients: newCards,
        })
    }, [ingredients, dispatch]);

    // Modal (OrderDetails)

    const order = useSelector(state => state.shop.order);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const idIngredients = ingredients.map(product => product.id)

    const handleOpenModal = () => {
        dispatch(
            getOrder([...idIngredients, bun, bun])
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
            .map(item => totalPrice += allIngredients.find(product => product._id === item.id)
                .price);

        if (bun != null) {
            totalPrice += 2 * allIngredients.find(product => product._id === bun).price;
        }

        return totalPrice;
    }, [ingredients, bun, allIngredients]);

    if (!allIngredients.length) return null;

    return (
        <div className={styles.burgerconstructor__column} ref={dropTargerRef}>
            <h2 className={`visually-hidden`}>Лента заказов</h2>
            {(ingredients.length > 0) || bun
                ?
                <>
                    <div className={styles.burgerconstructor__top}>
                        {(bun != null) &&
                            <ConstructorIngredient id={bun} position={'top'} />
                        }
                    </div>

                    <div className={styles.burgerconstructor__scrollwrapper}>
                        <ul className={styles.burgerconstructor__list}>
                            {(ingredients.length > 0) &&
                                ingredients.map((product, index) =>
                                    <ConstructorIngredient
                                        id={product.id}
                                        uid={product.uid}
                                        key={product.uid}
                                        index={index}
                                        moveCard={moveCard}
                                    />)
                            }
                        </ul>
                    </div>

                    <div className={styles.burgerconstructor__bottom}>
                        {(bun != null) &&
                            <ConstructorIngredient id={bun} position={'bottom'} />
                        }
                    </div>

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
                    <div className={'pt-30 pb-30'} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <p className={`text text_type_main-medium pt-30 pb-30 pl-10 pr-10 mb-30`} style={{ textAlign: 'center' }}>
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