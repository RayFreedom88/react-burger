import React from "react";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

class Ingredient extends React.Component {
    state = {
        count: 0,     
    };

    increment = () =>  {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        const count = this.state.count;
        
        return (
            <li className={this.props.class} key={this.props._id} onClick={this.increment}>
                {this.state.count >= 1 ? <Counter count={count} size="default" /> : null}
                
                <img src={this.props.image} alt={this.props.name}/>
    
                <p className="text text_type_digits-default mt-1 mb-1">
                    <span>{this.props.price}</span>&nbsp;
                    <CurrencyIcon type="primary" />
                </p>
                
                <p className="text text_type_main-small mb-5">
                    {this.props.name}
                </p>
            </li>
        );
    }
}

export default Ingredient;