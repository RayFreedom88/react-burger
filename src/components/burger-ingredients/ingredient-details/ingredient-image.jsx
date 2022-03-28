import React from 'react';
import styles from '../burger-ingredients.module.css';
import PropTypes from 'prop-types';

function ingredientImage ({ img, alt }) {
  return (
    <div className={styles.ingredient_image}>
      <img src={img} alt={alt}/>
    </div>
  )
}

ingredientImage.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default ingredientImage