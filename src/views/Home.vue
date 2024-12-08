<template>
  <div class="container py-4">
    <h1 class="mb-4">Products</h1>
    
    <div class="row g-4">
      <div v-for="product in products" :key="product.id" class="col-md-4">
        <div class="card h-100">
          <img :src="product.image" class="card-img-top" :alt="product.name">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text"><strong>${{ product.price }}</strong></p>
            <router-link :to="'/product/' + product.id" class="btn btn-primary">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import productsData from '../data/products.json'

const products = ref([])

onMounted(() => {
  products.value = productsData.products
})
</script>