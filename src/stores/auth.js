import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  function login(username, password) {
    // Simple login logic for demo
    if (username && password) {
      const userData = { username }
      localStorage.setItem('user', JSON.stringify(userData))
      user.value = userData
      return true
    }
    return false
  }

  function logout() {
    localStorage.removeItem('user')
    user.value = null
  }

  return {
    user,
    login,
    logout
  }
})