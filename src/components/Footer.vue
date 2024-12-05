<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <a href="/" class="footer-link">Inicio</a>
        <a href="/" class="footer-link">Sobre Nosotros</a>
        <a href="/" class="footer-link">Términos y Condiciones</a>
        <a href="/" class="footer-link">Política de Privacidad</a>
      </div>
      <div class="social-media">
        <a href="https://www.facebook.com" target="_blank" rel="noopener" class="social-icon">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener" class="social-icon">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener" class="social-icon">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
      <p>© 2024 Uanlog.com. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: static;
  width: 100%;
  background-color: #252525;
  color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
  margin-top: 100%;
}

.footer-content {
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.footer-link {
  color: #aaa;
  text-decoration: none;
  font-size: 14px;
}

.footer-link:hover {
  color: white;
}

.social-media {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-icon {
  color: white;
  font-size: 24px;
  transition: transform 0.3s;
}

.social-icon:hover {
  transform: scale(1.2);
}

/* Estilos Responsivos */
@media (max-width: 800px) {
  .footer-content {
    gap: 15px;
  }

  .footer-links {
    flex-direction: column;
    gap: 10px;
  }

  .footer-link {
    font-size: 13px;
  }

  .social-media {
    gap: 8px;
  }

  .social-icon {
    font-size: 20px;
  }
}
</style>
