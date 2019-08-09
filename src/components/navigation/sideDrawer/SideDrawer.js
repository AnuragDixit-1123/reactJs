

import React from 'react';
import Logo from '../../logo/Logo'
import NavigationItems from '../navigationItems/NavigationItems'
import './SideDrawer.css'
import BackDrop from '../../UI/BackDrop/Backdrop';
import Aux from '../../../hoc/Auxillary';

const sideDrawer = ( props ) => {
// CSS class for the animation

let attachedClasses = ['SideDrawer', 'Close']
if(props.open){
    attachedClasses = ['SideDrawer', 'Open']
}
console.log(props, 'attached classes', attachedClasses)
    return (
        <Aux>
        <BackDrop 
          show={props.open}
          clicked={props.closed}
        />
       <div className= {attachedClasses.join(' ')} >
        <div className='Logo2'>
           <Logo />
           </div>
           <nav>
               <NavigationItems />
            </nav>
        </div>
        </Aux>
    );

}

export default sideDrawer;