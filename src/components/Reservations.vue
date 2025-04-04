<script>
import axios from "axios";
import Swal from "sweetalert2";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheSpinner from "@/components/TheSpinner.vue";
import { DateTime } from "luxon";

export default {
  name: "Reservations",
  components: {
    TheHeader,
    TheFooter,
    TheSpinner,
  },
  data() {
    return {
      loading: false,
      reservations: [],
    };
  },
  methods: {
    fetchReservations() {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Token no encontrado",
          text: "Por favor inicia sesión.",
        });
        return;
      }

      this.loading = true;
      axios
        .get("/reservation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.reservations = res.data.map((reservation) => ({
            ...reservation,
            title: reservation.eventId?.title || "Sin título",
            description: reservation.eventId?.description || "Sin descripción",
            formattedDate: DateTime.fromISO(reservation.eventId?.date)
              .minus({ hours: 5 })
              .toFormat("yyyy-MM-dd HH:mm:ss"),
          }));
        })
        .catch((err) => {
          console.error("Error al traer reservaciones:", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar las reservaciones.",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    async deleteReservation(reservationId) {
      const confirm = await Swal.fire({
        title: "¿Cancelar reservación?",
        text: "¿Estás seguro de cancelar tu lugar en este evento?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "No",
      });

      if (!confirm.isConfirmed) return;

      const token = localStorage.getItem("token");

      try {
        await axios.delete(`/reservation/${reservationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire("Cancelado", "Tu reservación fue cancelada.", "success");
        this.fetchReservations();
      } catch (err) {
        console.error("Error al cancelar reservación:", err);
        Swal.fire("Error", "No se pudo cancelar la reservación", "error");
      }
    },
  },
  mounted() {
    this.fetchReservations();
  },
};
</script>


<!-- Component content -->
<template>
  <section class="content d-flex flex-column min-vh-100" :class="{ 'dark-overlay': loading }">
    <the-header />
    <the-spinner v-if="loading" />

    <header class="d-flex flex-column align-items-center text-center p-4 bg-light shadow-sm mb-3">
      <h2 class="fw-bold text-dark mb-3">Mis reservaciones</h2>
      <router-link to="/events" class="btn btn-outline-dark">
        <i class="fa fa-arrow-left me-2"></i>Volver
      </router-link>
    </header>

    <section class="container mb-5">
      <div class="row g-4">
        <div
          v-for="reservation in reservations"
          :key="reservation._id"
          class="col-md-6 col-lg-4"
        >
          <div class="card shadow-sm h-100 border-0 rounded-4 position-relative">
            <button
              class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2 rounded-circle"
              @click="deleteReservation(reservation._id)"
              title="Cancelar reservación"
            >
              <i class="fa fa-times"></i>
            </button>
            <div class="card-body d-flex flex-column">
              <h5 class="fw-bold text-primary">{{ reservation.title }}</h5>
              <p class="text-secondary flex-grow-1">{{ reservation.description }}</p>
              <p class="text-muted mt-3">
                <i class="fa fa-clock me-2"></i>{{ reservation.formattedDate }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="!loading && reservations.length === 0" class="text-center py-5">
          <h5 class="text-muted">No tienes reservaciones por ahora.</h5>
        </div>
      </div>
    </section>

    <section class="mt-auto">
      <the-footer />
    </section>
  </section>
</template>


<style scoped>
.content {
  overflow-x: hidden;
  background-color: #f8f9fa;
}
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
.text-primary {
  color: #0d6efd !important;
}
.text-secondary {
  color: #6c757d;
}
.dark-overlay {
  position: relative;
}
</style>
