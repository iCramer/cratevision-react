import axios from 'axios';

const API = axios.create({
  baseURL: 'http://my.bundlevo.com/',
  headers: {Authorization: localStorage.getItem('jwt')}
});

export default API;

//Proxy address -> https://thingproxy.freeboard.io/fetch/
