import axios from 'axios';
import { withRouter } form 'react-router-dom';

class HttpService {
  urlBase = 'http://my.bundlevo.com/';

  getToken() {
    return localStorage.getItem('jwt');
  }

  get(endpoint) {
    return axios.get(this.urlBase + endpoint, { headers: { authorization: this.getToken() } })
    .then(resp => {
      this.setState({ products: resp.data || [], filteredProducts: resp.data });
    })
    .catch(error => {
      console.log(error.response)
    });
  }
}
