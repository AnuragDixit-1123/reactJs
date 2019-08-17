
import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary';
import './Layout.css';
import Toolbar from '../../components/navigation/toolbar/Toolbar';
import SideDrawer from '../../components/navigation/sideDrawer/SideDrawer';
/**
 * @description
 * Toolbar called here because we want to see it all the time.
 * 
 */
class Layout extends Component {

  state = {
    showSideDrawer: true
  }
  /**
   * @description
   */
  sideDrawerClosedHandler = () => {

    this.setState({ showSideDrawer: false})
  }

   /**
   * @description
   */
  sideDrawerToggleHandler = () => {

    this.setState( (prevState) => { 
     return { 
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }

  render() {

    return (
      <Aux>
         <Toolbar 
           drawerToggleClicked={this.sideDrawerToggleHandler}
         />
           <SideDrawer 
             open={this.state.showSideDrawer}
             closed={this.sideDrawerClosedHandler}
           />
         <main className= 'Content'>
           {this.props.children}
         </main>
      </Aux>
    
    )
  } 
}

export default Layout;