<template>
  <div class="container py-4">
    <h1 class="mb-4">Shopping Cart</h1>
    
    <div class="row" v-if="cartStore.items.length">
      <!-- Cart Items -->
      <div class="col-lg-8">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div v-for="item in cartStore.items" 
                 :key="item.id" 
                 class="cart-item mb-3 p-3 border rounded">
              <div class="row align-items-center">
                <div class="col-auto">
                  <div class="form-check">
                    <input type="checkbox" 
                           class="form-check-input" 
                           :value="item.id"
                           v-model="cartStore.selectedItems">
                  </div>
                </div>
                <div class="col-md-2">
                  <img :src="item.image" 
                       class="img-fluid rounded" 
                       :alt="item.name">
                </div>
                <div class="col-md-4">
                  <h5 class="mb-1">{{ item.name }}</h5>
                  <p class="text-muted mb-0">Unit Price: ${{ item.price }}</p>
                </div>
                <div class="col-md-3">
                  <div class="input-group">
                    <button class="btn btn-outline-secondary" 
                            @click="decrementQuantity(item)">
                      <i class="bi bi-dash"></i>
                    </button>
                    <input type="number" 
                           class="form-control text-center" 
                           v-model="item.quantity"
                           @change="updateQuantity(item.id, item.quantity)"
                           min="1">
                    <button class="btn btn-outline-secondary" 
                            @click="incrementQuantity(item)">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-2 text-end">
                  <p class="h5 mb-2">${{ (item.price * item.quantity).toFixed(2) }}</p>
                  <button class="btn btn-outline-danger btn-sm" 
                          @click="removeItem(item.id)">
                    <i class="bi bi-trash"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4 class="card-title mb-4">Order Summary</h4>
            
            <div class="d-flex justify-content-between mb-2">
              <span>Selected Items:</span>
              <span>{{ cartStore.selectedItems.length }}</span>
            </div>
            
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${{ cartStore.total.toFixed(2) }}</span>
            </div>
            
            <div class="d-flex justify-content-between mb-2">
              <span>Shipping:</span>
              <span>${{ shipping.toFixed(2) }}</span>
            </div>
            
            <hr>
            
            <div class="d-flex justify-content-between mb-3">
              <span class="h5">Total:</span>
              <span class="h5">${{ (cartStore.total + shipping).toFixed(2) }}</span>
            </div>
            
            <button class="btn btn-primary w-100" 
                    :disabled="!cartStore.selectedItems.length"
                    @click="checkout">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty Cart -->
    <div v-else class="text-center py-5">
      <i class="bi bi-cart-x display-1 text-muted mb-4"></i>
      <h3>Your cart is empty</h3>
      <p class="text-muted">Add some items to your cart to proceed with shopping.</p>
      <router-link to="/" class="btn btn-primary mt-3">
        Continue Shopping
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const shipping = ref(10.00)

function updateQuantity(productId, quantity) {
  cartStore.updateQuantity(productId, parseInt(quantity))
}

function removeItem(productId) {
  cartStore.removeItem(productId)
}

function incrementQuantity(item) {
  updateQuantity(item.id, item.quantity + 1)
}

function decrementQuantity(item) {
  if (item.quantity > 1) {
    updateQuantity(item.id, item.quantity - 1)
  }
}

function checkout() {
  // Implement checkout logic here
  alert('Checkout functionality will be implemented soon!')
}
</script>

<style scoped>
.cart-item {
  transition: all 0.3s ease;
  background-color: #fff;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input-group {
  width: 120px;
}

.input-group input {
  text-align: center;
}

.input-group input::-webkit-outer-spin-button,
.input-group input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-group input[type=number] {
  -moz-appearance: textfield;
}

.bi {
  font-size: 1.1rem;
}
</style>