import React from "react";
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient ({ count, className, name, image, price, onClick }) {
    const [state, setState] = React.useState({count: count});

    const currentCount = state.count;
        
    return (
        <li className={className} onClick={onClick}>
            {state.count >= 1 ? <Counter count={currentCount} size="default" /> : null}
            
            <img src={image} alt={name}/>

            <p className="text text_type_digits-default mt-1 mb-1">
                <span>{price}</span>&nbsp;
                <CurrencyIcon type="primary" />
            </p>
            
            <p className="text text_type_main-small mb-5">
                {name}
            </p>
        </li>
    );
}

Ingredient.propTypes = {
    className: PropTypes.string.isRequired,
    count: PropTypes.number,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Ingredient;