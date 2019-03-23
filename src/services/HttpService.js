import axios from 'axios';

export default class HttpService {
  urlBase = 'http://my.bundlevo.com/';

  getToken() {
    return localStorage.getItem('jwt');
  }

  get(endpoint) {
    return axios.get(this.urlBase + endpoint, { headers: { authorization: this.getToken() } });
  }
}
