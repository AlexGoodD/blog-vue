<template>
  <div class="preview">
    <h1>Previsualiza tu post</h1>
    <div class="action-section">
      <button @click="publishPost">Publicar</button>
    </div>
    <BlogCard
      :post="{
        title,
        author: authorName || 'Anónimo',
        thumbnailUrl,
        content,
        createdAt: { seconds: Math.floor(Date.now() / 1000) },
      }"
    />
  </div>
</template>

<script>
import BlogCard from '../components/BlogCard.vue'

export default {
  components: { BlogCard },
  props: ['title', 'authorName', 'thumbnailFile', 'onPublish', 'content'],
  computed: {
    thumbnailUrl() {
      return this.thumbnailFile ? URL.createObjectURL(this.thumbnailFile) : '/default-thumbnail.jpg'
    },
  },
  methods: {
    publishPost() {
      this.onPublish()
    },
  },
  beforeDestroy() {
    if (this.thumbnailFile) {
      URL.revokeObjectURL(this.thumbnailUrl)
    }
  },
}
</script>

<style scoped>
.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.action-section {
  text-align: center;
  margin-top: 20px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056cc;
}

.BlogCard {
  display: block;
  margin: 0 auto;
}

/* Responsivo */
@media (max-width: 800px) {
  .preview {
    padding: 0 5%;
    text-align: center;
  }
}
</style>
