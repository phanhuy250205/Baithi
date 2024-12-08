import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/mycart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login')
  } else {
    next()
  }
})

export default router