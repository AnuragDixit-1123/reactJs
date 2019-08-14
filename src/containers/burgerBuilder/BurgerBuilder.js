
import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/buildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import OrderSummary from '../../components/burger/orderSummary/OrderSUmmary';
import Spinner from '../../components/UI/spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4, 
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component { 
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing : false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-d9d79.firebaseio.com/ingredients.json').then(
            response => {
                console.log(response)
                 this.setState({ingredients: response.data})  
            }
        ).catch(error => {
            this.setState({error: true})
        })
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
        // alert('You Continue')

        // Order data for the api call

         this.setState({loading: true})

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, // This should be done on server
            customer: {
                name: 'Anurag',
                address: {
                    street: 'vipul world',
                    zipCode: '122001'

                },
                email: 'ad@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        // api call in the firebase
        axios.post('/orders.json', order)
        .then(response => {
            console.log(response)
            this.setState({loading: false, purchasing: false})

        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false, purchasing: false})

        })
    }

    orderSummary = () => {
        return(
                <OrderSummary 
                     ingredients={this.state.ingredients}
                     price={this.state.totalPrice}
                     purchaseCancelled={this.purchaseCancelHandler}
                     purchaseContinued={this.purchaseContinueHandler}
                   />
        )
    }

    burgerUi = (disabledInfo) => {
       
        return (
           <Aux>
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
        );
    }

    render() {
       
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
       
        let burger = this.state.error ? <p>Ingredients cant be loaded</p>:<Spinner />
        if(this.state.ingredients) {
           
            console.log('inside the if condition')
            burger = this.burgerUi(disabledInfo)
            orderSummary = this.orderSummary()
            if ( this.state.loading ) {
                orderSummary = <Spinner />
            }
           
        } 
       
         

        return(
           <Aux>
               <Modal 
                 show={this.state.purchasing} 
                 modalClosed={this.purchaseCancelHandler}
                >
                   {orderSummary}
                   </Modal>
                 {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);