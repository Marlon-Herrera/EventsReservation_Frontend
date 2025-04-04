<script>
// Exports
export default {
  name: "TheFooter",
}
</script>

<!-- Define template -->
<template>
  <footer class="bg-events-two text-white pb-5 footer" style="color: #FFFF; text-align: center;">
    <span class="text mt-5">
      <i class="bi bi-c-circle icon "></i>&emsp;<span>2025 Desarrollado por Marlon Herrera. Todos los derechos reservados</span>
    </span>
  </footer>
</template>

<!-- Define styles -->
<style scoped>
.footer {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

@media (max-width: 540px) {
  .text {
    width: 150px;
  }

  .footer{
    height: 80px;
  }
}
</style>