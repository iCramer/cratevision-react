import axios from 'axios';

const API = axios.create({
  baseURL: 'http://my.bundlevo.com/',
  headers: {Authorization: localStorage.getItem('jwt')}
});

export default API;
