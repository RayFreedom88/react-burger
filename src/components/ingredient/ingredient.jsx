import React from "react";
import IngredientStyles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

class Ingredient extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={IngredientStyles.ingredient}>
                {this.props.count === 1 ? <Counter count={1} size="default" /> : null}
                
                <img src={this.props.image}/>
    
                <p className="text text_type_digits-default mt-1 mb-1">
                    <span>{this.props.price}</span>&nbsp;
                    <CurrencyIcon type="primary" />
                </p>
                
                <p className="text text_type_main-small mb-5">
                    {this.props.name}
                </p>
            </div>
        );
    }
}


export default Ingredient;