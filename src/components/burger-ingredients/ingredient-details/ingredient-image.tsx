import React, { FC } from 'react';
import { IIngredientImage } from '../../../services/types/components';

import styles from '../burger-ingredients.module.css';

const ingredientImage: FC<IIngredientImage> = ({ img, alt }) => {
    
    return (
        <div className={styles.burgeringredients__image}>
            <img src={img} alt={alt} />
        </div>
    )
}

export default ingredientImage