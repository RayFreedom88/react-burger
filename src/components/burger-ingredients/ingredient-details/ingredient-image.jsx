import React from 'react';
import PropTypes from 'prop-types';
import styles from '../burger-ingredients.module.css';

function ingredientImage({ img, alt }) {
    return (
        <div className={styles._image}>
            <img src={img} alt={alt} />
        </div>
    )
}

ingredientImage.propTypes = {
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

export default ingredientImage