import React, { useState, useMemo } from 'react';

import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorIngredient from './constructor-ingredient';
import Modal from '../modal/modal';
import OrderDetails from './order-details';

import { useDrop } from "react-dnd";
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
                id: item.id
            });
        }
    };

    const [, dropTargerRef] = useDrop({
        accept: 'item',

        drop(item) {
            moveItem(item)
        },
    });

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
            .map(item => totalPrice += allIngredients.find(product => product._id === item)
                .price);

        if (bun != null) {
            totalPrice += 2 * allIngredients.find(product => product._id === bun).price;
        }

        return totalPrice;
    }, [ingredients, bun, allIngredients]);

    if (!allIngredients.length) return null;

    return (
        <div className={styles.burgerconstructor__column} ref={ dropTargerRef }>
            <h2 className={`visually-hidden`}>Лента заказов</h2>
            {(ingredients.length > 0) || bun
                ?
                <>
                    <div className={ styles.burgerconstructor__top }>
                        {(bun != null) &&
                            <ConstructorIngredient id={ bun } position={ 'top' } />
                        }
                    </div>

                    <div className={styles.burgerconstructor__scrollwrapper}>
                        <ul className={styles.burgerconstructor__list}>
                            { (ingredients.length > 0) && 
                                ingredients.map((product, index) => 
                                    <ConstructorIngredient id={ product } key={ index } />)
                            }
                        </ul>
                    </div>

                    <div className={ styles.burgerconstructor__bottom }>
                        {(bun != null) &&
                            <ConstructorIngredient id={ bun } position={ 'bottom' } />
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