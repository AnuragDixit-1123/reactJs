
import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/buildControls/BuildControls';

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
        totalPrice: 4
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
    }


    render() {
const disabledInfo = {
    ...this.state.ingredients
}

        return(
           <Aux>
               <Burger ingredients={this.state.ingredients}/>
            {/** 
            this.addIngrdientHandler IT PASSES THE REFERENCE OF THE OBJECT INSTEAD OF WHOLE FUNCTION
            */}   
               <BuildControls 
                 ingredientAdded={this.addIngrdientHandler}
                 ingredientRemoved={this.removeIngredientHandler}
               />
            </Aux>
        )
    }
}

export default BurgerBuilder;