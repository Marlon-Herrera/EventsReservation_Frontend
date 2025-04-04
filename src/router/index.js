import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import TheEventsView from '@/views/TheEventsView.vue'
import TheReservationView from '@/views/TheReservationView.vue'
import TheRegisterView from '@/views/TheRegisterView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "",
            component: LoginView,
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/events",
            name: "events",
            component: TheEventsView,
        },
        {
            path: "/reservation",
            name: "reservation",
            component: TheReservationView,
        },
        {
            path: "/logout",
            name: "logout",
            component: () => import("../views/LogoutView.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: TheRegisterView,
        },
    ],
});

export default router
