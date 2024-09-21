import { createRouter, createWebHistory } from 'vue-router';
import DomainsPage from "./components/Pages/DomainsPage.vue";
import VisitsPage from "./components/Pages/VisitsPage.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/domain-visits-app/domains',
            name: 'DomainsPage',
            component: DomainsPage,
        },
        {
            path: '/domain-visits-app/domains/:id/visits',
            name: 'VisitsPage',
            component: VisitsPage,
        },
    ],
});
