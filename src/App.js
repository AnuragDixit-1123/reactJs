import React, { Component } from 'react';
import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder'

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
        </Layout>
        { this.state.show ? <BurgerBuilder /> : null }
      </div>
    );
}
}

export default App;
