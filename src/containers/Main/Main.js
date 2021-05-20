import React, { useRef, useState, Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {isEqual, isEmpty} from 'lodash';
import { Container, Row, Col, Image, Card, Button, Carousel, Form, ListGroup } from 'react-bootstrap';
import Menu from '../../components/Menu';
import styles from './Main.style';
import {getCategories, getPostsByCategory, getPosts} from '../../constants/api';
import logo from '../../assets/images/dark-logo.png';
import banner from '../../assets/images/wallpaper.jpeg';
import Search from '../../components/Search';
import Categories from './components/Categories';
import Items from './components/Items';

const Listing = () => {
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState({});
  const [pageToken, setPageToken] = useState('');
  const [search, setSearch] = useState('');

  const [loading, setLoading]  = useState(true);

  useEffect( () => {
  }, [] )


  return (
    <Container fluid>
      <Row>
        <Col lg={12} style={styles.menuAndListing}>
          <Row>
            <Col lg={12} className='content'>
              <Menu />
            </Col>
            <Col lg={12} className='banner'>
              <div className='content'>
                <Search/>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row >
        <Col lg={12} className='content'>
          <Row>
            <Col sm={12} md={8} lg={8}>
              <Items />
            </Col>
            <Col sm={12} md={4} lg={4}>
              <Categories />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Listing;
