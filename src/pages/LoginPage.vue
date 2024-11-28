<template>
  <div class="login-page">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="loginUser">
      <label for="email">Correo Electrónico</label>
      <input id="email" v-model="email" type="email" placeholder="Ingresa tu correo" required />

      <label for="password">Contraseña</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Ingresa tu contraseña"
        required
      />

      <button type="submit">Ingresar</button>
    </form>
  </div>
</template>

<script>
import { login } from '../services/authService'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async loginUser() {
      try {
        console.log(`Iniciando sesión con: ${this.email}`)
        await login(this.email, this.password)
        alert('Inicio de sesión exitoso')
      } catch (error) {
        console.error('Código del error:', error.code)
        console.error('Mensaje del error:', error.message)
        alert('Error al iniciar sesión')
      }
    },
  },
}
</script>
