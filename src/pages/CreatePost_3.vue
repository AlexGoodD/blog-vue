<template>
  <div class="preview">
    <h1>Previsualiza tu blog</h1>
    <div class="action-section">
      <button @click="publishPost">Publicar</button>
    </div>
    <BlogCard
      :post="{
        title,
        author: authorName || 'Anónimo',
        thumbnailUrl,
      }"
    />
  </div>
</template>

<script>
import BlogCard from '../components/BlogCard.vue'

export default {
  components: { BlogCard },
  props: ['title', 'authorName', 'thumbnailFile', 'onPublish'],
  computed: {
    thumbnailUrl() {
      return this.thumbnailFile ? URL.createObjectURL(this.thumbnailFile) : 'default-thumbnail.jpg'
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
  padding-right: 50px;
  padding-left: 50px;
}

.action-section {
  text-align: center;
  margin-top: 20px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056cc;
}
</style>
