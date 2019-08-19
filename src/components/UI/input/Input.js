
import React from 'react';
import './Input.css';

const input = ( props ) => {

    let inputElement = null;

    switch (props.elemetType) {
        case 'input' : {
            inputElement = <input 
                              className='InputElement' 
                              {...props.elementConfig} 
                              value={props.value}
                            />
            break;
        }
        case 'input' : {
            inputElement = <textarea {...props} />
            break;
        }
        default:
    }
    return(
        <div >
            <label className='Label'>
             {props.label}
            </label>  
            {inputElement}
         </div>   
    )
}

export default input;