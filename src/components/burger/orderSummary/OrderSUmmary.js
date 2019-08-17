
import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillary'
import Button from  '../../UI/button/Button';

class OrderSummary extends Component {


componentDidUpdate() {
    console.log(' i was update')
}

    render() {
    const ingerdientSummary = Object.keys(this.props.ingredients)
                             .map(igKey => {
                                 return(
                                     <li><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
                                 )
                             })
    return(
        <Aux>
            <h3>Order Summary</h3>
            <p>your delicious Burger contains the following ingredients : </p>
            <ul>
                 {ingerdientSummary}

            </ul>
            <p><strong>Total price: ${this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button
              btnType='Danger'
              clicked={this.props.purchaseCancelled}
            >
                CANCEL</Button>
            <Button
            btnType='Success'
            clicked={this.props.purchaseContinued}


            >CONTINUE</Button>
            </Aux>
    )

}
}

export default OrderSummary;