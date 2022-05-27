import React, { FC, useRef } from 'react';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from '../../services/hooks';
import { DELETE_SELECTED_INGREDIENT } from '../../services/actions/shop';
import { IConstructorIngredient } from '../../services/types/components';

import styles from './burger-constructor.module.css';

const ConstructorIngredient: FC<IConstructorIngredient> = ({ id, uid, position, moveCard, index }) => {
    const dispatch = useDispatch();

    const allIngredients = useSelector(state => state.shop.allIngredients);
    const product = allIngredients.find(item => item._id === id);

    const ref = useRef<HTMLLIElement>(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'selected',

        collect(monitor) {

            return {
                handlerId: monitor.getHandlerId()
            }
        },

        hover(item: any, monitor) {
            if (!ref.current) {

                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {

                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex! && hoverClientY < hoverMiddleY) {

                return;
            }

            if (dragIndex > hoverIndex! && hoverClientY > hoverMiddleY) {

                return;
            }

            moveCard!(dragIndex, hoverIndex!);
            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'selected',

        item: () => ({ id: product!._id, index }),

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    if (product!.type !== 'bun') drag(drop(ref));

    const handleDeleteInredient = () => {
        dispatch({
            type: DELETE_SELECTED_INGREDIENT,
            uid: uid
        });
    }

    return (position ?
        <ConstructorElement
            type={position}
            isLocked={true}
            text={`${product!.name} ${position === 'top' ? ' (верх)' : ' (низ)'}`}
            price={product!.price}
            thumbnail={product!.image}
        />
        :
        <li className={styles.burgerconstructor__item} style={{ opacity }} ref={ref} data-handler-id={handlerId}>
            <DragIcon type='primary' />

            <ConstructorElement
                text={product!.name}
                price={product!.price}
                thumbnail={product!.image}
                handleClose={handleDeleteInredient}
            />
        </li>
    )
};

export default ConstructorIngredient;
