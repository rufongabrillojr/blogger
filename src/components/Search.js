import React, { useRef, useState, Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <div className='search'>
      <input type='text' placeholder='Search' onChange={(e) => { setSearch(e.target.value) }} value={search}/>
      <Button href={`/search?q=${search}`} variant="primary">Search</Button>
    </div>
  )
}

export default Search;
