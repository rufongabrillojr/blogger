import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Image, Navbar } from 'react-bootstrap';

import pin from '../assets/images/pin.png';

class Marker extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div>
        <Image src={pin} style={styles.logo} fluid/>
      </div>
    );
  }
}

export default Marker;

const styles = {
  logo:{
    width: '30px',
    height: '30px', 
    margin: '0px 5px 0px 0px',
    transform: 'translate(-50%,-100%)'
  },
  link: {
    // color: '#fff'
  }
}