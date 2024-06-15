import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import StockDetails from '../views/StockDetails.vue';
import Settings from '../views/Settings.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/stock/:id',
        name: 'StockDetails',
        component: StockDetails,
        props: true,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
    },
    // Add other routes here
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
