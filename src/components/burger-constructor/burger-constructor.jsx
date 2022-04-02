import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from './order-details';
import { IngredientsContext } from '../../services/ingredients-context.jsx';
// import { itemPropTypes } from '../../utils/types';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
    const { dataIngredients } = useContext(IngredientsContext);

    const buns = dataIngredients.filter(item => item.type === 'bun');

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

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
                    {dataIngredients.map(item => item.type !== 'bun' ? (
                        <li className={styles.burgerconstructor__item} key={item._id}>
                            <DragIcon type='primary' />

                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>) : (null)
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
                    <span>600</span>&nbsp;
                    <CurrencyIcon type='primary' />
                </p>

                <Button type='primary' size='large' onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>

            <Modal
                header={``}
                isOpen={isOpenModal}
                onClose={handleCloseModal}
            >
                <OrderDetails id={`034536`} />
            </Modal>
        </div>
    );
}

// BurgerConstructor.propTypes = {
//     items: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired
// };

export default BurgerConstructor;