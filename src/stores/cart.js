import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart')) || [])
  const selectedItems = ref([])

  const total = computed(() => {
    return selectedItems.value.reduce((sum, itemId) => {
      const item = items.value.find(i => i.id === itemId)
      return sum + (item ? item.price * item.quantity : 0)
    }, 0)
  })

  function addToCart(product, quantity = 1) {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
    
    saveCart()
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      saveCart()
    }
  }

  function removeItem(productId) {
    items.value = items.value.filter(item => item.id !== productId)
    selectedItems.value = selectedItems.value.filter(id => id !== productId)
    saveCart()
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  return {
    items,
    selectedItems,
    total,
    addToCart,
    updateQuantity,
    removeItem
  }
})