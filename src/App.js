import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Layout from './containers/layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder'
import Checkout from './containers/checkout/Checkout';
import Orders from './containers/orders/Orders';

class App extends Component {

  state= {
    show: true
  }

  /**
   * @description
   * This code was just to check whether componentwillunmount 
   * was called or not 
   * 
   */

  // componentDidMount() {
  //      setTimeout(() => {
  //        this.setState({ show: false})
  //      }, 5000)
  // }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
          {/* Switch so that it stops once it matches the path 
             only the direct component gets the special props

             Withrouter is used to pass the data to inner component
          */}
         <Route path='/checkout' component={Checkout} />
         <Route path='/orders' component={Orders} />
         <Route path='/' exact  component={BurgerBuilder} />

           </Switch>
           

        {/* 
          THIS IS FOR THE LAZY LOADING
        { this.state.show ? <BurgerBuilder /> : null } */}
        </Layout>
      </div>
    );
}
}

export default App;
