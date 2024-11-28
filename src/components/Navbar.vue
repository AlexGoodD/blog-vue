<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { auth } from '../services/firebase.js'

const isLoggedIn = ref(false)

//Autenticación para la modificación del navbar
onMounted(() => {
  auth.onAuthStateChanged((user) => {
    isLoggedIn.value = !!user
  })
})

// Lógica de cerrar sesión
const logout = async () => {
  try {
    await auth.signOut()
    alert('Has cerrado sesión')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <router-link to="/" class="logo-link">
        <h1>UANLOG<span>.COM</span></h1>
      </router-link>
    </div>
    <nav class="nav-links">
      <template v-if="isLoggedIn">
        <router-link to="/create" class="link">Crear Blog</router-link>
        <button @click="logout" class="btn">Cerrar sesión</button>
      </template>
      <template v-else>
        <router-link to="/register" class="link">Registrarse</router-link>
        <router-link to="/login" class="btn">Iniciar sesión</router-link>
      </template>
    </nav>
  </header>
</template>
