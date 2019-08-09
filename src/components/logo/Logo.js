

import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'
import './Logo.css';

/**
 *@description 
 * This will add the logo to the screen
 */

const logo = ( props ) => (
  <div className='Logo'>
      <img src={burgerLogo} alt='myBurger' />
  </div>
)

export default logo;