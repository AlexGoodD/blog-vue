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

      <label for="email">Correo electrónico</label>
      <input id="email" v-model="email" type="email" placeholder="Ingresa tu correo" required />

      <label for="password">Contraseña</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Ingresa tu contraseña"
        required
      />

      <label for="confirmPassword">Confirmar contraseña</label>
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

<style scoped>
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
  font-size: 2.3rem;
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
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 1rem;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #353535;
  color: white;
}

input:focus {
  outline: none;
  border-color: #0066ff;
}

button .link {
  color: white;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 500;
}
</style>
