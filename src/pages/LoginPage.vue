<!-- eslint-disable vue/block-lang -->
<template>
  <div class="login-page">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="loginUser">
      <label for="email">Correo Electrónico</label>
      <input id="email" v-model="email" type="email" required />

      <label for="password">Contraseña</label>
      <input id="password" v-model="password" type="password" required />

      <button type="submit">Ingresar</button>
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
    async loginUser() {
      try {
        // Lógica para inicio de sesión
        console.log(`Iniciando sesión con: ${this.email}`)
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
      }
    },
  },
}
</script>

<style scoped>
/* Estilos específicos para la página */
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
