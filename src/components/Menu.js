import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Image, Navbar } from 'react-bootstrap';

import logo from '../assets/images/white-logo.png';
import logoDark from '../assets/images/dark-logo.png';

class Menu extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <Navbar>
        <Navbar.Brand href="#" style={styles.link}>
          <Image src={logoDark} style={styles.logo} fluid/> SG Realties
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Menu;

const styles = {
  logo:{
    width: '30px',
    height: '30px', 
    margin: '0px 5px 0px 0px'
  },
  link: {
    // color: '#fff'
  }
}