
import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/buildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/burger/orderSummary/OrderSUmmary';
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4, 
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component { 
    state = {
        ingredients: {
            salad: 0,
            bacon: 0, 
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing : false
    }

    /**
     * @description 
     *  This updates whether user can buy a product or not. 
     * Recieving value as parameter because state is not getting updated on time
     * 
     */
    updatePurchaseState(ingredient) {
        //  const ingredient ={ ...this.state.ingredients};
         const sum = Object.keys(ingredient)
         .map(igKey => {
             return (ingredient[igKey])
         })
         .reduce((sum, el) => {
             return sum + el;
         }, 0)
         this.setState({purchasable: sum > 0})
    }

    /**
     * @description
     * This function will add the ingredient of a particular type
     * all this code because we cannot mutate state directly
     * 
     */
    addIngrdientHandler = (type) => {
         const oldCount = this.state.ingredients[type];
         const updatedCount = oldCount + 1;
         const updatedIngredients = {
             ...this.state.ingredients
         };
         updatedIngredients[type] = updatedCount;

         // CODE FOR UPDATING PRICES
         const priceAddition = INGREDIENT_PRICES[type]
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice + priceAddition;
         this.setState({ totalPrice: newPrice, ingredients: updatedIngredients})
         this.updatePurchaseState(updatedIngredients);
    }

    /**
     * @description
     * This function will remove the ingredient of a particular type
     * all this code because we cannot mutate state directly
     * 
     */

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if( oldCount < 1) {
            return;
        }
         const updatedCount = oldCount - 1;
         const updatedIngredients = {
             ...this.state.ingredients
         };
         updatedIngredients[type] = updatedCount;

         // CODE FOR UPDATING PRICES
         const priceDeduction = INGREDIENT_PRICES[type]
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice - priceDeduction;
         this.setState({ totalPrice: newPrice, ingredients: updatedIngredients})
         // Passing value because sometimes state doesnot get updated on time
         this.updatePurchaseState(updatedIngredients);         
    }


    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    /**
     * @description
     * This is to close the modal which we have created
     * 
     */
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

     /**
     * @description
     * This is to press the continue button
     * 
     */
    purchaseContinueHandler = () => {
        // this.setState({purchasing: false})
        alert('You Continue')
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        return(
           <Aux>
               <Modal 
                 show={this.state.purchasing} 
                 modalClosed={this.purchaseCancelHandler}
                >
                   <OrderSummary 
                     ingredients={this.state.ingredients}
                     price={this.state.totalPrice}
                     purchaseCancelled={this.purchaseCancelHandler}
                     purchaseContinued={this.purchaseContinueHandler}
                   />
                   </Modal>
               <Burger ingredients={this.state.ingredients}/>
            {/** 
            this.addIngrdientHandler IT PASSES THE REFERENCE OF THE OBJECT INSTEAD OF WHOLE FUNCTION
            */}   
               <BuildControls 
                 ingredientAdded={this.addIngrdientHandler}
                 ingredientRemoved={this.removeIngredientHandler}
                 disabled={disabledInfo}
                 price={this.state.totalPrice}
                 purchasable={this.state.purchasable}
                 ordered={this.purchaseHandler}
               />
            </Aux>
        )
    }
}

export default BurgerBuilder;