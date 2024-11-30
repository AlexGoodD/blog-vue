<template>
  <div class="blog-card" @click="openPost">
    <img :src="post.thumbnailUrl || '/default-thumbnail.jpg'" alt="Miniatura" />
    <h3>{{ post.title || 'Sin título' }}</h3>
    <p>Por: {{ post.author || 'Anónimo' }}</p>
  </div>
</template>

<script>
export default {
  props: { post: Object },
  mounted() {
    console.log('Datos del post recibido:', this.post) // Verifica los datos recibidos
  },
  methods: {
    openPost() {
      if (this.post.id) {
        this.$router.push(`/post/${this.post.id}`)
      } else {
        console.warn('El ID del post no está definido.')
      }
    },
  },
}
</script>

<style scoped>
.blog-card {
  width: 150px;
  cursor: pointer;
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.blog-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.blog-card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  transition: opacity 0.2s ease;
}

.blog-card img:hover {
  opacity: 0.9;
}

.blog-card h3 {
  font-size: 14px;
  margin: 10px 0 5px;
  color: #333;
}

.blog-card p {
  font-size: 12px;
  color: #555;
}
</style>
