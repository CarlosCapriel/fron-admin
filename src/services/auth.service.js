import axios from 'axios';

const API_URL = 'http://localhost/proveedor/login';
const API_URL2 = 'http://localhost/productos/api/products/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/admin', {
        email: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.information) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + '/admin/register', {
      Nombre: user.Nombre,
      ApellidoP: user.ApellidoP,
      ApellidoM: user.ApellidoM, 
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  saveProducts(productos, email) {
    return axios.post(API_URL2 + email, {
      Name: productos.Name,
      Price: productos.Price,
      Description: productos.Description, 
      category: productos.category
    });
  }
}

export default new AuthService();
