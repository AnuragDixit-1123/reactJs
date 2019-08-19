

import React, { Component } from 'react';
import Button from '../../../components/UI/button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/Spinner';
import Input from '../../../components/UI/input/Input';

class ContactData extends Component {
 
    state = {
     
      loading: false,
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Your Name'
          },
          value: ''

        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'street'
            },
            value: ''
  
          },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zipcode'
            },
            value: ''
  
          },
          country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: ''
  
          },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your email address'
            },
            value: ''
  
          },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{value: ' fastest', displayValue: 'Fastest'}, {value: ' cheapest', displayValue: 'Cheapest'}],
            },
            value: ''
  
          },
      }
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
        <Input  elementType='...' elementConfig='...' value='...'/>
        <Input inputtype='input' type='email' name='email' placeholder='Your email' />
        <Input inputtype='input' type='text' name='street' placeholder='Street' />
        <Input inputtype='input' type='text' name='postal' placeholder='Postal Code' />
        
        <Button 
          btnType='Success'
          clicked={this.orderHandler}
         > 
           ORDER
         </Button>
        </form>
    )

    render() {

       const formElementArray = [];
       for ( let key in this.state.orderForm) {
           formElementArray.push({
               id:  key
           }
           )
       }

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