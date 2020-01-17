import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSumarry from '../../components/Order/CheckoutSumarry/CheckoutSumarry';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    constructor (props) {
        super();

        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
            
        }

        this.state = {ingredients: ingredients, totalPrice: price};
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSumarry
                ingredients={this.state.ingredients}
                checkoutCanceled={this.checkoutCanceledHandler} 
                checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>} />
            </div>
        );
    }
}

export default Checkout;