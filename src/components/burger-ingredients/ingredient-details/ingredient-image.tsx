import React, { FC } from 'react';
import { IIngredientImage } from '../../../utils/interfaces';

import styles from '../burger-ingredients.module.css';

const ingredientImage: FC<IIngredientImage> = ({ img, alt }) => {
    
    return (
        <div className={styles.burgeringredients__image}>
            <img src={img} alt={alt} />
        </div>
    )
}

// ingredientImage.propTypes = {
//     img: PropTypes.string.isRequired,
//     alt: PropTypes.string.isRequired
// };

export default ingredientImage