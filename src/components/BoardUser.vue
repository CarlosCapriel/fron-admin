<template>
  <div class="container">
     <Form @submit="registrarProducto" :validation-schema="schema">
        <div class="form-group">
          <label for="Name">Nombre</label>
          <Field name="Name" type="text" class="form-control" />
          <ErrorMessage name="Name" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="Price">Precio</label>
          <Field name="Price" type="number" class="form-control" />
          <ErrorMessage name="Price" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="Description">Descripción</label>
          <Field name="Description" as="textarea" class="form-control" />
        </div>
        <div class="form-group">
          <label for="category">Categoría</label>
          <Field name="category" as="select" class="form-control" >
            <option>Fruto</option>
            <option>Flor</option>
            <option>Cactus</option>
          </Field>
          <ErrorMessage name="category" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Registrar producto</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
      <div class="form-group">
          <div v-if="content" class="alert alert-success" role="alert">
            {{ content }}
          </div>
        </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "User",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      Name: yup.string().required("Nombre es obligatorio!"),
      Price: yup.number().typeError("algo").min(1, "Valor minimo de 1"),
      category: yup.string().required("La categoría es obligatorio!")
    });
    return {
      content: "",
      message: "",
      schema
    };
  },
  mounted() {
    // UserService.getUserBoard().then(
    //   (response) => {
    //     this.content = response.data;
    //   },
    //   (error) => {
    //     this.content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },
  methods: {
    registrarProducto(producto){
      UserService.saveProducts(producto).then(
      (response) => {
         this.content = response.data;
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
      // this.$store.dispatch("products/email",producto).then(
      //   (data) => {
      //     this.message = data.message;
      //     this.successful = true;
      //     this.loading = false;
      //   },
      //   (error) => {
      //     this.message =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       error.message ||
      //       error.toString();
      //     this.successful = false;
      //     this.loading = false;
      //   }
      // );
    }
  },
};
</script>
<style>
.error-feedback {
  color: red;
}
</style>