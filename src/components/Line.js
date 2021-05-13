import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Image, Navbar } from 'react-bootstrap';

import logo from '../assets/images/white-logo.png';
import logoDark from '../assets/images/dark-logo.png';

class Line extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className='propsLine'></div>
    );
  }
}

export default Line;

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