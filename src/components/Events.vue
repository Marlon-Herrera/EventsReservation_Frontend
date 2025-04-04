<script>
import axios from "axios";
import Swal from "sweetalert2";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheSpinner from "@/components/TheSpinner.vue";
import EventModal from "@/components/EventModal.vue";
import { DateTime } from "luxon";

export default {
    name: "Events",
    components: {
        TheHeader,
        TheFooter,
        TheSpinner,
        EventModal,
    },
    data() {
        return {
            loading: false,
            events: [],
            showModal: false,
            selectedEvent: null,
        };
    },
    computed: {
        fixedEvent() {
            if (!this.selectedEvent) return null;
            return {
                ...this.selectedEvent,
                date: this.selectedEvent.date ? this.selectedEvent.date.slice(0, 16) : "",
            };
        },
    },
    methods: {
        fetchEvents() {
            this.loading = true;
            axios
                .get("/events")
                .then((res) => {
                    this.events = res.data.map((event) => ({
                        ...event,
                        formattedDate: DateTime.fromISO(event.date)
                            .minus({ hours: 5 })
                            .toFormat("yyyy-MM-dd HH:mm:ss"),
                    }));
                })
                .catch((err) => {
                    console.error("Error al traer eventos:", err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async reserveEvent(eventId) {
            const token = localStorage.getItem("token");
            if (!token) {
                Swal.fire({
                    icon: "warning",
                    title: "Token no encontrado",
                    text: "Por favor inicia sesión.",
                });
                return;
            }

            try {
                await axios.post(
                    `/reservation/${eventId}/reserve`,
                    { eventId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                Swal.fire({
                    icon: "success",
                    title: "Evento agendado",
                    text: "Te has registrado correctamente al evento.",
                });
                this.fetchEvents();
            } catch (error) {
                console.error("Error al agendar evento:", error);
                const errorMessage = error.response?.data?.message || "Hubo un problema al agendar el evento.";
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: errorMessage,
                });
            }
        },
        async deleteEvent(eventId) {
            const confirm = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            });

            if (confirm.isConfirmed) {
                try {
                    await axios.delete(`/events/${eventId}`);
                    Swal.fire({
                        icon: "success",
                        title: "Evento eliminado",
                        text: "El evento ha sido eliminado correctamente.",
                    });
                    this.fetchEvents();
                } catch (error) {
                    console.error("Error al eliminar evento:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Hubo un problema al eliminar el evento.",
                    });
                }
            }
        },
        openCreateModal() {
            this.selectedEvent = null;
            this.showModal = true;
        },
        openEditModal(event) {
            this.selectedEvent = event;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedEvent = null;
        },
        async handleSaveEvent(eventData) {
            try {
                if (eventData.date) {
                    eventData.date = eventData.date.replace("T", " ");
                }

                if (eventData._id) {
                    await axios.put(`/events/${eventData._id}`, eventData);
                    Swal.fire("Actualizado", "El evento fue actualizado", "success");
                } else {
                    await axios.post("/events", eventData);
                    Swal.fire("Creado", "El evento fue creado", "success");
                }
                this.closeModal();
                this.fetchEvents();
            } catch (error) {
                console.error("Error al guardar evento:", error);
                Swal.fire("Error", "No se pudo guardar el evento", "error");
            }
        },
    },
    mounted() {
        this.fetchEvents();
    },
};
</script>

<!-- Component content -->
<template>
    <section class="content d-flex flex-column min-vh-100" :class="{ 'dark-overlay': loading }">
        <the-header />
        <the-spinner v-if="loading" />

        <header class="header-container">
            <h2 class="title">Eventos recientes</h2>
            <div class="buttons-container">
                <router-link to="/reservation" class="btn btn-outline-primary">
                    Ver mis reservaciones
                </router-link>
                <button class="btn btn-success" @click="openCreateModal">Crear evento</button>
            </div>
        </header>

        <section class="container card p-4 shadow border mt-1 mb-5">
            <div class="row">
                <div v-for="event in events" :key="event._id" class="col-md-6 col-lg-4 mb-4">
                    <div class="card shadow-sm p-3 border position-relative">
                        <div class="event-actions position-absolute top-0 end-0 p-2">
                            <button class="btn btn-sm btn-outline-danger me-1" @click="deleteEvent(event._id)"
                                title="Eliminar">
                                <i class="fa fa-times"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-secondary" @click="openEditModal(event)"
                                title="Editar">
                                <i class="fa fa-pencil-alt"></i>
                            </button>
                        </div>
                        <div class="card-body">
                            <h5 class="fw-bold">{{ event.title }}</h5>
                            <p>{{ event.description }}</p>
                            <p class="text-muted">
                                <i class="fa fa-clock me-2"></i>{{ event.formattedDate }}
                            </p>
                            <p>
                                <strong>Capacidad:</strong> {{ event.capacity }}<br />
                                <strong>Reservados:</strong> {{ event.reserved || 0 }}
                            </p>
                            <button class="btn btn-primary mt-2" @click="reserveEvent(event._id)">
                                Agendar evento
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <event-modal v-if="showModal" :event="fixedEvent" @save="handleSaveEvent" @close="closeModal" />

        <section class="mt-auto">
            <the-footer />
        </section>
    </section>
</template>

<style scoped>
.content {
    overflow-x: hidden;
}

.header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
}

.title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
}

.buttons-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}

.card {
    border-radius: 15px;
    position: relative;
}

.event-actions {
    z-index: 10;
}
</style>
