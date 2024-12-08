<template>
  <div class="container py-4">
    <div v-if="product" class="row">
      <div class="col-md-6">
        <img :src="product.image" class="img-fluid" :alt="product.name">
      </div>
      <div class="col-md-6">
        <h1>{{ product.name }}</h1>
        <p class="lead">{{ product.description }}</p>
        <p class="h3 mb-4">${{ product.price }}</p>
        
        <div class="mb-3">
          <label class="form-label">Quantity:</label>
          <input type="number" class="form-control w-25" v-model="quantity" min="1">
        </div>
        
        <button class="btn btn-primary" @click="addToCart">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import productsData from '../data/products.json'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref(null)
const quantity = ref(1)

onMounted(() => {
  const productId = parseInt(route.params.id)
  product.value = productsData.products.find(p => p.id === productId)
  
  if (!product.value) {
    router.push('/')
  }
})

function addToCart() {
  if (product.value && quantity.value > 0) {
    cartStore.addToCart(product.value, quantity.value)
    router.push('/mycart')
  }
}
</script>