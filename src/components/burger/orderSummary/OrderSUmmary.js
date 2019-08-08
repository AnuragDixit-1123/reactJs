
import React from 'react';
import Aux from '../../../hoc/Auxillary'
import Button from  '../../UI/button/Button';

const orderSummary = ( props ) => {
    const ingerdientSummary = Object.keys(props.ingredients)
                             .map(igKey => {
                                 return(
                                     <li><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
                                 )
                             })
    return(
        <Aux>
            <h3>Order Summary</h3>
            <p>your delicious Burger contains the following ingredients : </p>
            <ul>
                 {ingerdientSummary}

            </ul>
            <p>Continue to checkout?</p>
            <Button
              btnType='Danger'
              clicked={props.purchaseCancelled}
            >CANCEL</Button>
            <Button
            btnType='Success'
            clicked={props.purchaseContinued}


            >CONTINUE</Button>
            </Aux>
    )

}

export default orderSummary;