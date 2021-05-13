import {key, id, googleapis, blogger} from '../constants/key';
import {sendRequest} from '../api/Base';
// let cors = 'https://cors-anywhere.herokuapp.com';
// let cors = 'https://api.codetabs.com/v1/proxy?quest=';

export const getCategories = () => {
  return sendRequest({
    base: `https://sgrealties-a2b77.firebaseio.com`,
    path: `/blog/categories/.json`,
    method: 'GET',
  });  
}

export const getPosts = () => {
  return sendRequest({
    base: googleapis,
    path: `/blogger/v3/blogs/${id}/posts?key=${key}`,
    method: 'GET',
  });  
}

export const getPostsByCategory = (category) => {
  return sendRequest({
    base: googleapis,
    path: `/feeds/${id}/posts/default?alt=json&?key=${key}&q=label:${category}`,
    method: 'GET',
  });  
}

export const getPost = (post) => {
  return sendRequest({
    base: googleapis,
    path: `/blogger/v3/blogs/${id}/posts/${post}?key=${key}`,
    
    method: 'GET',
  });  
}