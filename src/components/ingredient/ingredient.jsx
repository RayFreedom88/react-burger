import React from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient (props) {
    const [state, setState] = React.useState({count: props.count});
   

    const increment = () =>  {
        setState({
            count: state.count + 1
        });
    }

    const count = state.count;
        
    return (
        <li className={props.class} key={props._id} onClick={increment}>
            {state.count >= 1 ? <Counter count={count} size="default" /> : null}
            
            <img src={props.image} alt={props.name}/>

            <p className="text text_type_digits-default mt-1 mb-1">
                <span>{props.price}</span>&nbsp;
                <CurrencyIcon type="primary" />
            </p>
            
            <p className="text text_type_main-small mb-5">
                {props.name}
            </p>
        </li>
    );
}

export default Ingredient;