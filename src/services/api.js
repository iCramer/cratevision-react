import axios from 'axios';

const API = axios.create({
  baseURL: 'http://api.bundlevo.com/',
  headers: {
    Authorization: localStorage.getItem('jwt'),
    'Content-Type': 'application/json'
  }
});

export default API;

//Proxy address -> https://thingproxy.freeboard.io/fetch/
