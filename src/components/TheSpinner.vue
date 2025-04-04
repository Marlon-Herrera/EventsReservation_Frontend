<script>
//Import
import ImgSpinner from "@/components/img/ImgSpinner.vue";

//Exports
export default {
  name: "TheSpinner",

  components: {
    ImgSpinner,
  },
};
</script>

<!-- Define template -->
<template>
  <div class="spinner-content">
    <ImgSpinner class="spinner-img" />
    <p class="font-weight-bold text-white">Cargando...</p>
  </div>
</template>
