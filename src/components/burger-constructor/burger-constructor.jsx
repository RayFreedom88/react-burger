import React, { useState, useContext, useMemo } from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from './order-details';
import { postOrder } from '../../utils/api';
import { IngredientsContext } from '../../services/ingredients-context.jsx';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
    const { dataIngredients } = useContext(IngredientsContext);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    const buns = dataIngredients.filter(item => item.type === 'bun');
    const otherItems = dataIngredients.filter(item => item.type !== 'bun');

    const handleOpenModal = () => {
        postOrder([
            buns[0]._id,
            ...otherItems.map((x) => x._id),
            buns[0]._id
        ]).then((res => {
            setOrderNumber(res.order.number);
        }))
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    const totalPrice = useMemo(() =>
        otherItems.reduce((sum, item) => sum + item.price, buns[0].price * 2),
        // eslint-disable-next-line
        [otherItems, buns[0]]
	);

    return (
        <div className={styles.burgerconstructor__column}>
            <h2 className={`visually-hidden`}>Лента заказов</h2>

            <div className={styles.burgerconstructor__top}>
                <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${buns[0].name} (верх)`}
                    price={buns[0].price}
                    thumbnail={buns[0].image}
                />
            </div>

            <div className={styles.burgerconstructor__scrollwrapper}>
                <ul className={styles.burgerconstructor__list}>
                    {otherItems.map(item => (
                        <li className={styles.burgerconstructor__item} key={item._id}>
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

            <div className={styles.burgerconstructor__bottom}>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={`${buns[0].name} (низ)`}
                    price={buns[0].price}
                    thumbnail={buns[0].image}
                />
            </div>

            <div className={styles.burgerconstructor__cost}>
                <p className={`text text_type_digits-medium mt-1 mr-5 mb-1 pr-5`}>
                    <span>{totalPrice}</span>&nbsp;
                    <CurrencyIcon type='primary' />
                </p>

                <Button type='primary' size='large' onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>
            {orderNumber &&
                <Modal
                    header={``}
                    isOpen={isOpenModal}
                    onClose={handleCloseModal}
                >
                    <OrderDetails id={orderNumber} />
                </Modal>
            }
        </div>
    );
}

export default BurgerConstructor;