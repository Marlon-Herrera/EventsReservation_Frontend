<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { checkEmail, checkPwd } from "@/assets/js/utils";
import TheFooter from '@/components/TheFooter.vue';
import ImgLogo from '@/components/img/ImgLogo.vue';

export default {
  name: 'Register',
  components: {
    TheFooter,
    ImgLogo
  },
  data() {
    return {
      registerData: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      emailInvalid: false,
      passwordInvalid: false,
      confirmPasswordInvalid: false,
      errorMessage: ''
    };
  },
  methods: {
    validateForm() {
      this.emailInvalid = !checkEmail(this.registerData.email);
      this.passwordInvalid = !checkPwd(this.registerData.password);
      this.confirmPasswordInvalid = this.registerData.password !== this.registerData.confirmPassword;
      
      if (this.emailInvalid || this.passwordInvalid || this.confirmPasswordInvalid) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el formulario',
          text: 'Por favor, corrige los errores antes de continuar.'
        });
        return false;
      }
      return true;
    },
    async register() {
      if (!this.validateForm()) return;
      const uri = '/users/register';
      const body = {
        email: this.registerData.email,
        password: this.registerData.password
      };
      try {
        const response = await axios.post(uri, body);
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Usuario registrado con éxito',
            confirmButtonText: 'Iniciar sesión'
          }).then(() => {
            this.$router.push('/login');
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: error.response?.data?.message || 'Hubo un problema, intenta nuevamente.'
        });
      }
    }
  }
};
</script>


  <!-- Component content -->
<template>
  <section>
    <div class="container bg-white p-0">
      <div class="row shadow">
        <div class="col-lg p-3 p-lg-5 text-center bg-md-green">
          <div class="d-none d-lg-block mt-5">
            <img-logo width="174" height="214" />
          </div>
          <div class="d-md-inline-flex align-items-center px-2 py-3 d-lg-none">
            <h1 class="fw-bold" style="font-size: 1.4em">CREA TU CUENTA</h1>
          </div>
        </div>
        <div class="col-lg p-0 m-0">
          <header class="p-5 d-none d-md-block d-sm-none bg-md-green1">
            <h2 class="fw-bold text-center">Regístrate</h2>
          </header>
          <div class="pb-5 px-5">
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="email"></label>
                <input type="text" class="form-control rounded-pill" id="email" placeholder="Correo"
                  v-model="registerData.email" :class="{'border-red-500': emailInvalid}" required />
              </div>
              <div class="form-group">
                <label for="password"></label>
                <input type="password" class="form-control rounded-pill" id="password"
                  placeholder="Contraseña" v-model="registerData.password" :class="{'border-red-500': passwordInvalid}" required />
              </div>
              <div class="form-group">
                <label for="confirmPassword"></label>
                <input type="password" class="form-control rounded-pill" id="confirmPassword"
                  placeholder="Confirmar Contraseña" v-model="registerData.confirmPassword" :class="{'border-red-500': confirmPasswordInvalid}" required />
              </div>
              <div v-if="errorMessage" class="alert alert-danger text-center text-red-500 mt-2 mb-4">
                {{ errorMessage }}
              </div>
              <div class="form-group d-grid gap-2 py-4">
                <button type="submit" class="btn fw-bold rounded-pill">Registrarse</button>
              </div>
              <div class="mt-4 text-center">
                <p class="text-sm text-gray-600">
                  ¿Ya tienes una cuenta? 
                  <router-link to="/login" class="text-blue-500 hover:text-blue-700 font-semibold">Inicia sesión aquí</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="footer d-none d-lg-block">
    <the-footer />
  </section>
</template>


<style scoped>
.container {
  margin-top: 7%;
}

.btn {
  background: black;
  color: white;
  border-color: black;
}

.btn:hover {
  background-color: white;
  color: black;
  border-color: black;
}

.class-invalid {
  border-color: red;
}

.custom-height {
  height: calc(var(--custom-height, 100vh) - 60px);
}

.footer {
  background-color: black;
  bottom: 0;
  position: absolute;
  width: 100%;
}

@media (max-width: 767px) {
  .custom-height {
    height: 25%;
  }
  h2 {
    align-items: start;
  }
}
</style>
