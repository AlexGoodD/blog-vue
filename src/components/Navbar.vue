<template>
  <header class="header">
    <div class="logo">
      <router-link to="/" class="logo-link">
        <h1>UANLOG<span>.COM</span></h1>
      </router-link>
    </div>
    <div class="hamburger-menu" @click="isMenuOpen = !isMenuOpen">
      <span class="material-symbols-outlined">menu</span>
    </div>
    <nav :class="['nav-links', { open: isMenuOpen }]">
      <template v-if="isLoggedIn">
        <router-link to="/user" class="link">Perfil</router-link>
        <router-link to="/create" class="btn c-blog">
          <span class="material-symbols-outlined">add_circle</span>
          Crear post
        </router-link>
      </template>
      <template v-else>
        <router-link to="/register" class="link">Registrarse</router-link>
        <router-link to="/login" class="btn">Iniciar sesión</router-link>
      </template>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue'
import { auth } from '../services/firebase.ts'

export default {
  name: 'Navbar',
  setup() {
    const isLoggedIn = ref(false)
    const isMenuOpen = ref(false)

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        isLoggedIn.value = !!user
      })
    })

    return {
      isLoggedIn,
      isMenuOpen,
    }
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5%;
  color: white;
  background-color: #141414;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0066ff;
}

.logo span {
  color: white;
}

.logo-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
}

.hamburger-menu {
  display: none;
  cursor: pointer;
}

.hamburger-menu span {
  font-size: 2rem;
  color: white;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  white-space: nowrap;
}

.nav-links.open {
  display: block;
}

.link {
  color: white;
  text-decoration: underline;
  font-size: 1rem;
  font-weight: 500;
}

.btn {
  background-color: white;
  color: black;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}

.btn:hover {
  background-color: #f1f1f1;
}

.c-blog {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 800px) {
  .hamburger-menu {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    background-color: #141414;
    position: absolute;
    width: 60%;
    top: 10%;
    right: 0;
    z-index: 999;
  }

  .nav-links.open {
    display: flex;
  }
  .link {
    width: 100%;
    text-align: left;
    padding: 0.5rem 1rem;
  }

  .btn {
    width: 100%;
    text-align: left;
    padding: 0.5rem 1rem;
    border-radius: 0;
  }
  .c-blog {
    gap: 0.5rem;
  }
}
</style>
