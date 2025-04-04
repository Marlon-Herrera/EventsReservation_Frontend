<!-- Define scripts -->
<script>
// Import libraries
import router from "@/router";

// Export
export default {
  name: "Logout",

  mounted: async function () {
    
        // Remove token from local storage
        localStorage.clear();

        // Redirect to login page
        router.push("login");
      
  },
};
</script>

<!-- Define template -->
<template></template>
