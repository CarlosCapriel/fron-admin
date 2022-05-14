import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost/productos/api/products/';
let emailU
class UserService {  
  getProducts(email) {
    emailU = email
    return axios.get(API_URL + email);
  }

  saveProducts(productos) {
    emailU = localStorage.getItem("email");
    return axios.post(API_URL + emailU, {
      Name: productos.Name,
      Price: productos.Price,
      Description: productos.Description, 
      category: productos.category
    });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
