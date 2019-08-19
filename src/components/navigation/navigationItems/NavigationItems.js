

import React from 'react';
import './NavigationItems.css'
import NavigationItem from './navigationItem/NavigationItem';

const navigationItems = () => (
    <ul className='NavigationItems'>
        <NavigationItem 
        link='/'
        exact
     // no need   active
        >
            Burger Builder
        </NavigationItem>
        <NavigationItem 
        link='/orders'
        
        >
            Orders
        </NavigationItem>
    </ul>

);



export default navigationItems;