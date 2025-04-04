<script>
  export default {
    name: "EventModal",
    props: {
      event: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        form: {
          title: "",
          description: "",
          date: "",
          capacity: 1,
        },
      };
    },
    watch: {
      event: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.form = {
              title: newVal.title || "",
              description: newVal.description || "",
              date: newVal.date || "",
              capacity: newVal.capacity || 1,
              _id: newVal._id, 
            };
          } else {
            this.form = {
              title: "",
              description: "",
              date: "",
              capacity: 1,
            };
          }
        },
      },
    },
    methods: {
      submitForm() {
        this.$emit("save", { ...this.form });
      },
    },
  };
</script>

<!-- Component content -->
<template>
    <div class="modal-backdrop">
      <div class="modal-content p-4 rounded shadow bg-white">
        <h4 class="mb-3">{{ event && event._id ? 'Editar evento' : 'Crear nuevo evento' }}</h4>
  
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="title" class="form-label">Título</label>
            <input v-model="form.title" type="text" id="title" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label for="description" class="form-label">Descripción</label>
            <textarea v-model="form.description" id="description" class="form-control" required></textarea>
          </div>
  
          <div class="mb-3">
            <label for="date" class="form-label">Fecha y hora</label>
            <input v-model="form.date" type="datetime-local" id="date" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label for="capacity" class="form-label">Capacidad</label>
            <input v-model.number="form.capacity" type="number" id="capacity" class="form-control" required min="1" />
          </div>
  
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-secondary me-2" @click="$emit('close')">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-content {
    width: 100%;
    max-width: 500px;
  }
  </style>
  