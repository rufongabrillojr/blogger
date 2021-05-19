import React, { useRef, useState, Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {isEqual, isEmpty} from 'lodash';
import { Container, Row, Col, Image, Card, Button, Carousel, Form, ListGroup } from 'react-bootstrap';
import Menu from '../../components/Menu';
import styles from './Main.style';
import {getCategories, getPostsByCategory, getPosts} from '../../constants/api';
import logo from '../../assets/images/dark-logo.png';
import banner from '../../assets/images/wallpaper.jpeg';

const Listing = () => {
  const [content, setContent] = useState([]);
  const [category, setCategory] = useState({});
  const [pageToken, setPageToken] = useState('');

  const [loading, setLoading]  = useState(true);

  // get categories
  useEffect( () => {
    let blog = async () => { 
      let categories = await getCategories();
      let loadedContents = localStorage.getItem('blogContent');

      let posts = [];

      if(isEmpty(loadedContents)){
        posts  =  await getPosts()

        let {items, nextPageToken} = posts.data;
        posts = items;
        
        setPageToken(nextPageToken); 
        localStorage.setItem('pageToken', nextPageToken);
      }
      else{
        let pageToken = localStorage.getItem('pageToken');
        posts = JSON.parse(loadedContents); 
        setPageToken(pageToken); 
      }

      setCategory(categories.data);
      setContent(posts);
      setLoading(false);
    };

    blog();
  }, [] )

  const nextBlogs = async () => {
    let posts = await getPosts(pageToken);
    let {items, nextPageToken} = posts.data;
    setContent([...content, items[0]]);
    setPageToken(nextPageToken); 
    localStorage.setItem('pageToken', (nextPageToken != undefined) ? nextPageToken :  'no token');
  }

  const displayCategories = () => {
    return category.map( (item, key) => {
      return <ListGroup.Item key={key}>{item}</ListGroup.Item>;
    } )
  }

  const displayPosts = () => {

    // saves the loaded contents
    localStorage.setItem('blogContent', JSON.stringify(content));

    return content.map( (item, key) => {
      // get image for banner
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

  console.log(content,  pageToken);

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
              <Row>{!loading && displayPosts()}</Row>
              {loading && 'Loading...'}
              { (pageToken != 'no token' && (pageToken != undefined)) && <Button variant="primary" onClick={ () => { nextBlogs() } } >Load more</Button> }
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
