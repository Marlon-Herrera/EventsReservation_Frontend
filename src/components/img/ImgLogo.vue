<script>
import logo from '@/assets/img/Events.svg';

export default {
  name: 'ImgLogo',

  props: {
    width: {
      type: String,
      default: '348',
    },
    height: {
      type: String,
      default: '429',
    },
  },
  
  data() {
    return {
      logo
    };
  },

};
</script>

<template>
  <div>
    <img :src="logo" class="responsive-logo" alt="Logo">
  </div>
</template>


<style scoped>
.responsive-logo {
  max-width: 100%;
  height: auto;
  padding: 15px;
}
</style>