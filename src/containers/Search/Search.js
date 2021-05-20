import React, { useRef, useState, Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {isEqual, isEmpty} from 'lodash';
import { Container, Row, Col, Image, Card, Button, Carousel, Form, ListGroup } from 'react-bootstrap';
import Menu from '../../components/Menu';
import styles from './Search.style';
import {searchPost} from '../../constants/api';
import logo from '../../assets/images/dark-logo.png';
import banner from '../../assets/images/wallpaper.jpeg';

const Listing = () => {
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState({});
  const [pageToken, setPageToken] = useState('');
  const [search, setSearch] = useState('');

  const [loading, setLoading]  = useState(true);

  useEffect( () => {
    let blog = async () => { 
      let reg = /^\?q=/g;
      let search = (window.location.search).replace(reg, ''); // added parenthesis for readability
      let posts = [];

      posts  =  await searchPost(search)
      let {items} = posts.data;

      setContent(items);
      setLoading(false);
    };

    blog();
  }, [] )

  const displayPosts = () => {

    console.log(content);
    return content.map( (item, key) => {

      let getImage = (item.content).match(/<img [^>]*src="[^"]*"[^>]*>/g) // find img tag
      let getImageSource = !isEmpty(getImage) ? getImage[0].replace(/.*src="([^"]*)".*/, '$1') : banner;
      let getFirstParagraph = (item.content).match(/<(\w+)>(.*?)<\/\1>/igm) || [item.content];

      return (
        <Col lg={4} md={4} key={key} >
          <Card >
            <Card.Img variant="top" src={getImageSource} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text className='truncate'><span dangerouslySetInnerHTML={{ __html: getFirstParagraph[0] }} /></Card.Text>
              <Button href={`/post?id=${item.id}`} variant="primary">Read more</Button>
            </Card.Body>
          </Card>
        </Col>
      );
    } )
  }


  return (
    <Container fluid>
      <Row>
        <Col lg={12} style={styles.menuAndListing}>
          <Row>
            <Col lg={12} className='content'>
              <Menu />
            </Col>
            <Col lg={12} className='banner' style={{background: `url(${banner})`}}>
              <div className='content'>
                Search Result
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row >
        <Col lg={12} className='content'>
          <Row>
            <Col sm={12} md={8} lg={8}>
              <Row>{!loading && displayPosts()}</Row>
            </Col>
            <Col sm={12} md={4} lg={4}>
              ads here
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Listing;
