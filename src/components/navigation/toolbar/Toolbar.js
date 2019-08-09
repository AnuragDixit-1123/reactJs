
import React from 'react';
import './Toolbar.css';
import Logo from '../../logo/Logo';
import NavigationItems from '../navigationItems/NavigationItems';
import DrawerToggle from '../sideDrawer/drawerToggle/DrawerToggle'

/**
 * @description
 * This create the top bar shown on the top of the screen
 * 
 * MENU button will show the side drawer.....
 */
const toolBar = ( props ) => {
    return(
        <header className='Toolbar'>
            <DrawerToggle 
              clicked={props.drawerToggleClicked}
            />
            <div className='Logo1'>
            <Logo />
            </div>
            <nav className='DesktopOnly'>
                <NavigationItems />
            </nav>
        </header>
    )

}

export default toolBar;