

import React, { Component } from 'react';
import Button from '../../../components/UI/button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/Spinner';

class ContactData extends Component {
 
    state = {
      name: '',
      email: '',
      address: {
          street: '',
          postalCode: ''
      },
      loading: false
    }

    orderHandler = (event) => {
        // important to prevent auto-loading
        event.preventDefault();
        this.setState({loading: true})

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, // This should be done on server
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
            this.setState({loading: false})
            this.props.history.push('/')

        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false})

        })
    

    }

    formUi = () => (
        <form>
        <input className='Input' type='text' name='name' placeholder='Your name' />
        <input className='Input' type='email' name='email' placeholder='Your email' />
        <input className='Input' type='text' name='street' placeholder='Street' />
        <input className='Input' type='text' name='postal' placeholder='Postal Code' />
        <Button 
          btnType='Success'
          clicked={this.orderHandler}
         > 
           ORDER
         </Button>
        </form>
    )

    render() {
        /**
         * @description
         * this will have the form which we will use
         */
        let form = this.formUi();
        if(this.state.loading) {
            form = <Spinner />
        }

        return(
            <div className='ContactData'>
              <h4>
                  Enter your Contact Data
               </h4>
              {form}
            </div>
        )
    }
}
export default ContactData