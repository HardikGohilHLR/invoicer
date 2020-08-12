import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: 'Create Invoice - Invoice Builder' }
    },
    {
        path: '/invoice',
        name: 'invoice',
        component: () => import('../views/Invoice.vue') ,  
        meta: { title: 'Invoice - Invoice Builder' }
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;