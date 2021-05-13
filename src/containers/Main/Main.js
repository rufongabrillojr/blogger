import React, { useRef, useState, Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {isEqual, isEmpty} from 'lodash';
import { Container, Row, Col, Image, Card, Button, Carousel, Form, ListGroup } from 'react-bootstrap';
import Menu from '../../components/Menu';
import styles from './Main.style';
import {getCategories, getPostsByCategory, getPosts} from '../../constants/api';
import logo from '../../assets/images/dark-logo.png';

const Listing = () => {
  const [content, setContent] = useState(null);
  const [category, setCategory] = useState({});
  // const [posts, setPosts] = useState({});
  // const [post, setPost] = useState({});
  // const [postByCategory, setPostByCategory] = useState({});
  const [loading, setLoading]  = useState(true);

  // get categories
  useEffect( () => {
    let blog = async () => { 
      let categories = await getCategories();
      setCategory(categories.data)

      let posts = await getPosts();
      setContent(posts.data.feed.entry)

      setLoading(false);
    };

    blog();
  }, [] )

  const displayCategories = () => {
    console.log(category, loading)

    return category.map( (item, key) => {
      return <ListGroup.Item key={key}>{item}</ListGroup.Item>;
    } )
  }

  const displayPosts = () => {

    return content.map( (item, key) => {
      console.log(item);

      let thumbnail = isEmpty(item.media$thumbnail) ? logo : item.media$thumbnail.url;
      return (
        <Card key={key} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={thumbnail} />
          <Card.Body>
            <Card.Title>{item.title.$t}</Card.Title>
            {/* <Card.Text>{item.content.$t}</Card.Text> */}
            <Button variant="primary">Read more</Button>
          </Card.Body>
        </Card>
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
            <Col lg={12} className='banner'>
              <div className='content'>
                <input type='text' placeholder='Search' />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row >
        <Col lg={12} className='content'>
          <Row>
            <Col sm={12} md={8} lg={8}>
              <ListGroup>{!loading && displayPosts()}</ListGroup>
              {loading && 'Loading...'}
            </Col>
            <Col sm={12} md={4} lg={4}>
              <ListGroup>{!loading && displayCategories()}</ListGroup>
              {loading && 'Loading...'}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Listing;
