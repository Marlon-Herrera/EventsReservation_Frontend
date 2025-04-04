<script>
import { RouterLink } from "vue-router";

export default {
  name: "TheHeader",
  components: {
    RouterLink,
  }
};
</script>


  <!-- Component content -->
<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg bg-azul p-3">
        <div class="container-fluid">
          <router-link to="/" class="navbar-brand mb-2">
          </router-link>

          <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link to="/logout" class="nav-link text-center" :class="{ active: $route.path === '/logout' }">
                  <button class="btn fw-bold btn-azul">
                    <i class="fa-solid fa-right-from-bracket me-3"></i>Cerrar Sesión
                  </button>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.bg-azul {
  background-color: #007bff; 
}

.btn-azul {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-azul:hover {
  background-color: #0056b3;
  color: white;
}

.navbar {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.nav-item {
  width: 200px;
  margin-right: 15px;
}

.nav-item .nav-link {
  height: 70px;
  width: 280px;
  padding: 15px;
}

@media (max-width: 991px) {
  .navbar-nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .navbar-nav .nav-item {
    width: 100%;
  }

  .navbar-nav .nav-item .nav-link {
    width: 100%;
    margin-bottom: -20px;
  }

  .navbar-nav .nav-item .nav-link .btn {
    width: 100%;
  }

  .navbar-brand {
    width: 200px;
  }

  .navbar-brand img {
    width: 100%;
    padding: 7px;
  }
}

@media (min-width: 992px) and (max-width: 1260px) {
  .navbar-nav {
    display: flex;
    flex-direction: row;
    padding: 0px;
  }

  .navbar-nav .nav-item {
    width: 200px;
    margin: 0;
  }

  .navbar-nav .nav-item .nav-link {
    height: 80px;
    width: 200px;
    padding: auto;
    margin-bottom: 10px;
  }

  .navbar-brand {
    width: 200px;
  }

  .navbar-brand img {
    width: 90%;
    padding: 12px;
  }
}

@media (min-width: 1261px) {
  .navbar-nav {
    display: flex;
    flex-direction: row;
    gap: 65px;
    margin-right: 50px;
  }

  .navbar-nav .nav-item {
    margin: -30px;
  }

  .navbar-nav .nav-item.users {
    margin-right: -75px;
    margin-left: -60px;
  }

  .navbar-nav .nav-item .nav-link {
    height: 70px;
    width: 280px;
    padding: 15px;
    margin-bottom: 1px;
  }

  .navbar-brand {
    width: 200px;
  }

  .navbar-brand img {
    width: 90%;
    padding: 10px;
  }
}

@media (max-width: 552px) {
  .container-fluid {
    display: flex;
    flex-direction: row;
  }

  .navbar-brand {
    width: 200px;
  }

  .navbar-brand img {
    width: 100%;
    padding: 5px;
  }
}

/* toggler styles */
.custom-toggler {
  border-color: rgba(0, 0, 0, 0);
}

.custom-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%28255, 255, 255, 1%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.custom-toggler:focus {
  outline: none;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.5);
}

.custom-toggler:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.custom-toggler:hover .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 123, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>
