import React from 'react';
import PropTypes from 'prop-types'
import { itemPropTypes } from "../../../utils/types";
import IngredientImage from './ingredient-image';
import styles from '../burger-ingredients.module.css'

function MicrolEmentsDetail({ caseType, microElementValue }) {
    let name = '';

    switch (caseType) {
      case 'calories':
        name = 'Калории, ккал';
        break;
      case 'proteins':
        name = 'Белки, г';
        break;
      case 'fat':
        name = 'Жиры, г';
        break;
      case 'carbohydrates':
        name = 'Углеводы, г';
        break;
      default: 
        name = '';
        break;
    }
  
    return (
      <div className={`text_color_inactive`}>
        <p className={'text  text_type_main-default pb-2'}>{name}</p>
        <p className={'text text_type_digits-default '}>{microElementValue}</p>
      </div>
    )
  }
  
  MicrolEmentsDetail.propTypes = {
    caseType: PropTypes.string.isRequired,
    microElementValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  }

function IngredientDetails({ ingredient }){

    return (
        <>
            <IngredientImage img={ingredient.image_large} alt={ingredient.name}/>
           
            <div className={`pb-8 pt-4`}>
                <p className={`text text_type_main-medium`}>{ingredient.name}</p>
            </div>

            <div className={`${styles._details} pb-15`}>
                <MicrolEmentsDetail 
                    caseType={'calories'} 
                    microElementValue={ingredient.calories} />
                <MicrolEmentsDetail 
                    caseType={'proteins'} 
                    microElementValue={ingredient.proteins} />
                <MicrolEmentsDetail 
                    caseType={'fat'} 
                    microElementValue={ingredient.fat} />
                <MicrolEmentsDetail 
                    caseType={'carbohydrates'} 
                    microElementValue={ingredient.carbohydrates} />
            </div>
        </>
      )
}

IngredientDetails.propTypes = {
    ingredient: itemPropTypes,
}

export default IngredientDetails