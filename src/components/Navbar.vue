<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">E-Shop</router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="authStore.user">
            <router-link class="nav-link" to="/mycart">
              My Cart ({{ cartItemsCount }})
            </router-link>
          </li>
        </ul>
        
        <div class="d-flex align-items-center">
          <template v-if="authStore.user">
            <span class="me-3">Welcome, {{ authStore.user.username }}</span>
            <button class="btn btn-outline-danger" @click="logout">Logout</button>
          </template>
          <router-link v-else class="btn btn-outline-primary" to="/login">
            Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const cartItemsCount = computed(() => {
  return cartStore.items.length
})

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>