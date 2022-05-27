import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import IngredientImage from './ingredient-image';
import { IMicrolEmentsDetail } from '../../../services/types/components';
import { useSelector } from '../../../services/hooks';

import styles from '../burger-ingredients.module.css'

const MicrolEmentsDetail: FC<IMicrolEmentsDetail> = ({ caseType, microElementValue }) => {
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
};

const IngredientDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { allIngredients } = useSelector(state => state.shop);
    
    const ingredient = (allIngredients.length > 0) 
        ? allIngredients.find(product => product._id === id) 
        : {image_large: '',name: '',calories: '',proteins: '',fat: '',carbohydrates: ''};

    return (
        <>
            <IngredientImage img={ingredient!.image_large} alt={ingredient!.name} />

            <div className={`pb-8 pt-4`}>
                <p className={`text text_type_main-medium`}>{ingredient!.name}</p>
            </div>

            <div className={`${styles.burgeringredients__details} pb-15`}>
                <MicrolEmentsDetail
                    caseType={'calories'}
                    microElementValue={ingredient!.calories} />
                <MicrolEmentsDetail
                    caseType={'proteins'}
                    microElementValue={ingredient!.proteins} />
                <MicrolEmentsDetail
                    caseType={'fat'}
                    microElementValue={ingredient!.fat} />
                <MicrolEmentsDetail
                    caseType={'carbohydrates'}
                    microElementValue={ingredient!.carbohydrates} />
            </div>
        </>
    )
};

export default IngredientDetails;
