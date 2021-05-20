import React, { useRef, useState, Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {isEqual, isEmpty} from 'lodash';
import { Container, Row, Col, Image, Card, Button, Carousel, Form, ListGroup } from 'react-bootstrap';
import {getPostsByCategory, getPosts} from '../../../constants/api';
import banner from '../../../assets/images/wallpaper.jpeg';


const Listing = () => {
  const [content, setContent] = useState([]);
  const [pageToken, setPageToken] = useState('');

  const [loading, setLoading]  = useState(true);

  useEffect( () => {
    let blog = async () => { 
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

  return (
    <>
      <Row>{!loading && displayPosts()}</Row>
      {loading && 'Loading...'}
      { ((pageToken != 'no token') && (pageToken != undefined) && (pageToken != 'undefined')) && <Button variant="primary" onClick={ () => { nextBlogs() } } >Load more</Button> }
    </>
  )
}

export default Listing;
