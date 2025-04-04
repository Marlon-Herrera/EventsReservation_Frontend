// Import libraries
import "@/assets/css/global.css";
import axios from "axios";
import router from "@/router";
import { createApp } from "vue";
import App from "./App.vue";

// Set axios default URL
axios.defaults.baseURL = "http://localhost:3030/api";

const app = createApp(App);

app.use(router);

app.mount("#app");
