import React, { useRef, useState, Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {isEqual, isEmpty} from 'lodash';
import { Container, Row, Col, Image, Card, Button, Carousel, Form, ListGroup } from 'react-bootstrap';
import Menu from '../../components/Menu';
import styles from './Post.style';
import {getPost} from '../../constants/api';
import logo from '../../assets/images/dark-logo.png';
import banner from '../../assets/images/wallpaper.jpeg';

const Listing = () => {
  const [post, setPost] = useState({});
  const [banner, setBanner] = useState({});
  // const [posts, setPosts] = useState({});
  // const [post, setPost] = useState({});
  // const [postByCategory, setPostByCategory] = useState({});
  const [loading, setLoading]  = useState(true);

  // get categories
  useEffect( () => {
    // get post id from url
    let reg = /\d+/g;
    let id = (window.location.search).match(reg)[0]; // added parenthesis for readability

    let post = async () => { 
      let postContent = await getPost(id);
      
      // get image for banner
      let getImage = (postContent.data.content).match(/<img [^>]*src="[^"]*"[^>]*>/g) // find img tag
      let getImageSource = !isEmpty(getImage) ? getImage[0].replace(/.*src="([^"]*)".*/, '$1') : banner;
      
      setPost(postContent);
      setBanner(getImageSource);
      setLoading(false);
    };
    post();
  }, [] )

  let displayPost = () => {
    let postContent = post.data.content.replace(/white-space: pre/g, '');
    postContent = postContent.replace(/<img [^>]*src="[^"]*"[^>]*>/g, ''); // removes styling from blogger

    return (
      <div style={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: postContent }} />
    );
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
              {!loading && displayPost()}
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
