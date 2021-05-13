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
  const [content, setContent] = useState({});
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
      setContent(posts.data.items);

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
      console.log(item)
      // get image for banner
      let getImage = (item.content).match(/<img [^>]*src="[^"]*"[^>]*>/g) // find img tag
      let getImageSource = !isEmpty(getImage) ? getImage[0].replace(/.*src="([^"]*)".*/, '$1') : banner;

      let getFirstParagraph = (item.content).match(/<(\w+)>(.*?)<\/\1>/igm) || [item.content];

      console.log(getFirstParagraph[0], getFirstParagraph.length);

      return (
        <Col lg={4} md={4} key={key} >
          <Card >
            <Card.Img variant="top" src={getImageSource} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              {/* <Card.Text className='text-truncate'><span dangerouslySetInnerHTML={{ __html: getFirstParagraph[0] }} /></Card.Text> */}
              <Card.Text className='truncate'>Praeterea iter est quasdam res quas ex communi. Praeterea iter est quasdam res quas ex communi.Praeterea iter est quasdam res quas ex communi.Praeterea iter est quasdam res quas ex communi.</Card.Text>
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
