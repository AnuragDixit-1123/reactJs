
import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary';

const withErrorHandler = (WrappedComponent, axios) => {

        return class extends Component  {

            state = {
                error: null
            }

            // componentDidMount() {
              componentWillMount() {
                this.reqInterceptor = axios.interceptors.request.use( req => {
                    this.setState({error: null})
                    return req
                })

                this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                    this.setState({error: error})
                })
            }

            /**
             * @description
             * This functions clears all the intercepttors which we have created 
             * eject is for that purpose only
             */
            componentWillUnmount() {
                console.log('will unmount', this.reqInterceptor, ' \n', this.resInterceptors)
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptors);
            }

            errorConfirmedHandler = () => {
                this.setState({error: null})
            }

            render() {
            return (
                <Aux>
                    <Modal 
                      show={this.state.error}
                      modalClosed={this.errorConfirmedHandler}
                      >
                        {(this.state.error) ? this.state.error.message : null}
                    </Modal>
                <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
    
    }



// const withErrorHandler = (WrappedComponent, axios) => {

//     return (props) => {
//         return (
//             <Aux>
//                 <Modal show={}>
//                     Something didnt work
//                 </Modal>
//             <WrappedComponent {...props} />
//             </Aux>
//         )
//     }

// }

export default withErrorHandler;