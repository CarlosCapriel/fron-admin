<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.information}}</strong> Profile
      </h3>
    </header>
    <strong>Productos:</strong>
    <table class="table">
  <thead>
    <tr class = "thead-dark">
      <th scope="col">Producto</th>
      <th scope="col">Precio</th>
      <th scope="col">Descripción</th>
      <th scope="col">Categoría</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="role in productos" :key="role">
      <td>{{role.name}}</td>
      <td>{{role.price}}</td>
      <td>{{role.description}}</td>
      <td>{{role.category}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      headers:[
        {
            text: 'Dessert (100g serving)',
            align: 'start',
            value: 'name',
          },
      ],
      productos:[],
      user: null,
    }
  },
  created() {
    this.user = this.$store.state.auth.user;
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    localStorage.setItem("email",this.user.information)
    UserService.getProducts(this.user.information).then(
      (response) => {
        this.productos = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
  }
};
</script>