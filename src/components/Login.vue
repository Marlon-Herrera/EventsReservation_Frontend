<script>
import axios from 'axios';
import TheFooter from '@/components/TheFooter.vue';
import ImgLogo from '@/components/img/ImgLogo.vue';
import { checkEmail, checkPwd } from "@/assets/js/utils";

export default {
  name: "Login",
  components: {
    TheFooter,
    ImgLogo
  },
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      errorMessage: '',
      emailInvalid: false,
      passwordInvalid: false,
      icon: 'fa-eye'
    };
  },

  mounted() {
    this.updateHeight();
    window.addEventListener('resize', this.updateHeight);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateHeight);
  },

  methods: {
    updateHeight() {
      const height = window.innerHeight;
      document.documentElement.style.setProperty('--custom-height', `${height}px`);
    },
    validateForm() {
      this.emailInvalid = !checkEmail(this.loginData.email);
      this.passwordInvalid = !checkPwd(this.loginData.password);
      return !this.emailInvalid && !this.passwordInvalid;
    },
    async login() {
      if (!this.validateForm()) {
        this.errorMessage = 'Datos inválidos';
        return;
      }

      const uri = '/users/login';
      const body = {
        email: this.loginData.email,
        password: this.loginData.password
      };

      try {
        const response = await axios.post(uri, body);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          this.$router.push('/events');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Credenciales incorrectas';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Intente de nuevo.';
        }
      }
    },
    togglePwd() {
      const passwordField = document.getElementById('password');
      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.icon = 'fa-eye-slash'; 
      } else {
        passwordField.type = 'password';
        this.icon = 'fa-eye';
      }
    }
  }
};
</script>

<template>
  <!-- Component content -->
  <section>
    <div class="container bg-white p-0">
      <div class="row shadow">
        <div class="col-lg p-3 p-lg-5 text-center bg-md-green">
          <div class="d-none d-lg-block mt-5">
            <img-logo width="174" height="214" />
          </div>
          <div class="d-md-inline-flex align-items-center px-2 py-3 d-lg-none">
            <h1 class="fw-bold" style="font-size: 1.4em">
              REALIZA TUS RESERVAS
            </h1>
          </div>
        </div>
        <div class="col-lg p-0 m-0">
          <header class="p-5 d-none d-md-block d-sm-none bg-md-green1">
            <h2 class="login fw-bold text-center">Bienvenido de Nuevo</h2>
          </header>
          <div class="pb-5 px-5">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email"></label>
                <input type="text" class="form-control rounded-pill" id="email" placeholder="Correo"
                  v-model="loginData.email" :class="{ 'border-red-500': emailInvalid }" @keyup.enter="onEnterKeyPress()"
                  required />
              </div>
              <div class="form-group">
                <label for="password"></label>
                <div class="input-group">
                  <input type="password" class="form-control rounded-start-pill" id="password" placeholder="Contraseña"
                    v-model="loginData.password" :class="{ 'border-red-500': passwordInvalid }"
                    @keyup.enter="onEnterKeyPress()" required />
                  <span class="input-group-text rounded-end-pill" v-on:click="togglePwd()">
                    <i class="fa" :class="icon"></i>
                  </span>
                </div>
              </div>
              <div v-if="passwordInvalid" class="text-xs text-red-500 mt-1">Contraseña inválida.</div>
              <div v-if="errorMessage" class="alert alert-danger text-center text-red-500 mt-2 mb-4">
                {{ errorMessage }}
              </div>
              <div class="form-group d-grid gap-2 py-4">
                <button type="submit" class="btn fw-bold rounded-pill">
                  Iniciar Sesión
                </button>
              </div>
              <div class="mt-4 text-center">
                <p class="text-sm text-gray-600">
                  ¿No tienes una cuenta?
                  <router-link to="/register" class="text-blue-500 hover:text-blue-700 font-semibold">Regístrate
                    aquí</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- The footer -->
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
