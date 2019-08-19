

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactData from './contactData/ContactData';

import CheckoutSummary from '../../components/order/checkoutSummary/CheckoutSummary';

class Checkout extends Component {

    state= {
        ingredients: null,
        totalPrice: 0
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () => {
        console.log('cancelled pressed', this.props)
       this.props.history.goBack();
    }

    componentWillMount() {
 
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){

            if(param[0] === 'price'){
               price = param[1]
            }
            else {
              ingredients[param[0]] = +param[1]
            }
        }

        this.setState({ingredients: ingredients, totalPrice: price})
    }

    render() {
        return(
            <div>
                <CheckoutSummary 
                  ingredients={this.state.ingredients}
                  checkoutCancelled={this.checkoutCancelledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}
                />
                {/* For normal routing of the page */}
                {/* <Route path={`${this.props.match.path}/contact-data`} component={ContactData} /> */}
                {/* For passing the data with the routing to the component */}
                  <Route 
                    path={`${this.props.match.path}/contact-data`} 
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} 
                />

            </div>
        )
    }
}
export default Checkout;