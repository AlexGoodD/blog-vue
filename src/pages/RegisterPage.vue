<template>
  <div class="register-page">
    <h1>Registro</h1>
    <form @submit.prevent="registerUser">
      <label for="firstName">Nombre</label>
      <input
        id="firstName"
        v-model="firstName"
        type="text"
        placeholder="Ingresa tu nombre"
        required
      />

      <label for="lastName">Apellidos</label>
      <input
        id="lastName"
        v-model="lastName"
        type="text"
        placeholder="Ingresa tus apellidos"
        required
      />

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

      <label for="confirmPassword">Confirmar Contraseña</label>
      <input
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        placeholder="Confirma tu contraseña"
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    async registerUser() {
      // Validar que las contraseñas coincidan
      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden.')
        return
      }

      try {
        console.log(`Intentando registrar usuario: ${this.email}`)
        await register(this.email, this.password, {
          firstName: this.firstName,
          lastName: this.lastName,
        })
        alert('Registro exitoso')

        // Redirigir a la página principal
        this.$router.push('/')
      } catch (error) {
        console.error('Código del error:', error.code)
        console.error('Mensaje del error:', error.message)
        alert('Error al registrar: ' + error.message)
      }
    },
  },
}
</script>
