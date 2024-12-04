<script setup lang="ts"></script>

<template>
  <div>
    <header class="header">
      <nav>
        <h1>BlogApp</h1>
        <ul class="nav-links">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/create">Crear Blog</router-link></li>
          <li><router-link to="/login">Iniciar Sesión</router-link></li>
          <li><router-link to="/register">Registro</router-link></li>
        </ul>
      </nav>
    </header>

    <main class="main-content">
      <slot />
      <!-- Aquí se renderizan las páginas -->
    </main>

    <footer class="footer">
      <p>© 2024 BlogApp. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style>
.header {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 15px;
}
.nav-links a {
  color: white;
  text-decoration: none;
}
.main-content {
  padding: 20px;
  min-height: 80vh;
}
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
}
</style>
