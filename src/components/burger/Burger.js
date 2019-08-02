

import React from 'react';
import  './Burger.css';
import BurgerIngredient from './burgerIngredient/BurgerIngredients';

const burger = ( props ) => {

  // const transormedIngredient = Object.keys(props.ingredients)
  //        .map(igkey => {
  //          return [...Array(props.ingredients[igkey])].map((_, i) => {
  //           return <BurgerIngredient key={igkey + i} type={igkey} />
  //          })
  //        });

  /**
   * @description
   * reduce to transform array into some thing else
   * it takes two arguments the previous value and the current value
   *  it also accepts initial value
   * 
   * 
   * you cannot create array from the negetive value to take care of that
   */
  let transormedIngredient = Object.keys(props.ingredients)
         .map(igkey => {
           return [...Array(props.ingredients[igkey])].map((_, i) => {
            return <BurgerIngredient key={igkey + i} type={igkey} />
           })
         }).reduce((arr, el) => {
           return arr.concat(el)
         }, [])

         console.log(transormedIngredient)
         if(transormedIngredient.length === 0) {
           transormedIngredient = <p>Please start adding ingredients </p>
         }

    return ( 
        <div className='Burger'>
         
          <BurgerIngredient type='bread-top'/>
            {transormedIngredient}
          <BurgerIngredient type = 'bread-bottom'/>


        </div>
    );
}

export default burger;