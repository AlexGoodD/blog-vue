<template>
  <div class="register-page">
    <h1>Registro</h1>
    <form @submit.prevent="registerUser">
      <label for="email">Correo</label>
      <input id="email" v-model="email" type="email" required />

      <label for="password">Contraseña</label>
      <input id="password" v-model="password" type="password" required />

      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
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
        // Lógica para registrar al usuario
        console.log(`Registrando usuario con email: ${this.email}`)
      } catch (error) {
        console.error('Error al registrar usuario:', error)
      }
    },
  },
}
</script>

<style scoped>
/* Estilos específicos de la página de registro */
.register-page {
  max-width: 400px;
  margin: auto;
}
</style>
