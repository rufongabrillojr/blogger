import React, { useRef, useState, Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isEqual, isEmpty } from 'lodash';
import { ListGroup } from 'react-bootstrap';
import { getCategories } from '../../../constants/api';

const Categories = () => {
  const [category, setCategory] = useState({});
  const [loading, setLoading]  = useState(true);

  useEffect( () => {
    let categories = async () => { 
      let categories = await getCategories();

      setCategory(categories.data);
      setLoading(false);
    };

    categories();
  }, [] )

  const displayCategories = () => {
    return category.map( (item, key) => {
      return <ListGroup.Item key={key}>{item}</ListGroup.Item>;
    } )
  }

  return (
    <>
        <ListGroup>{!loading && displayCategories()}</ListGroup>
        {loading && 'Loading...'}
    </>
  )
}

export default Categories;
