import React,{Component} from 'react';
import './Expert.css';
import Navbar from './Navbar';
import Feeds from './Efeeds'

    
    {/*import { Navbar, Nav,NavItem, NavDropdown, MenuItem,Jumbotron } from 'react-bootstrap';*/}

export default class Expert extends Component{
  render(){
      return(
          <div>
          <Navbar/>
          
          <Feeds/>
           
             {/* <p className='Heading title'>Hey You are in Expert File</p> */}
          </div>
      );
  }
}