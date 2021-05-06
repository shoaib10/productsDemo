import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/ProductHome.vue'
import Login from '../pages/Authentication/Login.vue'
import Registration from '../pages/Registration.vue'
import AddProducts from '../pages/AddProducts.vue'
import EditProducts from '../pages/EditProduct.vue'

//import firebase from 'firebase/app';

Vue.use(VueRouter)

const routes = [
    { path: '', redirect: { name: 'login' } },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/add',
        name: 'Add',
        component: AddProducts,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/edit',
        name: 'Edit',
        component: EditProducts,
        meta: {
            requiresAuth: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async(to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = localStorage.getItem('user');
    if (requiresAuth && !currentUser) {
        next('/login');
    } else {
        next();
    }
});

export default router