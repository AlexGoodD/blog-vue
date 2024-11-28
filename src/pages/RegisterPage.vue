<template>
  <div class="register-page">
    <h1>Registro</h1>
    <form @submit.prevent="registerUser">
      <label for="email">Correo</label>
      <input id="email" v-model="email" type="email" placeholder="Ingresa tu correo" required />

      <label for="password">Contraseña</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Ingresa tu contraseña"
        required
      />

      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
import { register } from '../services/authService'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async registerUser() {
      try {
        console.log(`Intentando registrar usuario: ${this.email}`)
        await register(this.email, this.password)
        alert('Registro exitoso')
        console.log(`Usuario registrado: ${this.email}`)
      } catch (error) {
        console.error('Código del error:', error.code)
        console.error('Mensaje del error:', error.message)
        alert('Error al registrar: ' + error.message)
      }
    },
  },
}
</script>
