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
        this.$router.push('/')
      } catch (error) {
        console.error('Código del error:', error.code)
        console.error('Mensaje del error:', error.message)
        alert('Error al iniciar sesión')
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #141414;
  color: white;
  text-align: center;
}

.login-page h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

form {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-size: 14px;
  text-align: left;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #0066ff;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #0066ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056cc;
}

.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #141414;
  color: white;
  text-align: center;
}

.register-page h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.register-page h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
