<template>
  <div class="create-post">
    <h1>Crear un Post</h1>
    <form @submit.prevent="createPost">
      <label for="title">Título</label>
      <input id="title" v-model="title" type="text" required />

      <label for="content">Contenido</label>
      <textarea id="content" v-model="content" required></textarea>

      <label for="banner">Imagen de Banner</label>
      <input id="banner" type="file" @change="handleBannerUpload" />

      <label for="thumbnail">Miniatura</label>
      <input id="thumbnail" type="file" @change="handleThumbnailUpload" />

      <button type="submit">Publicar</button>
    </form>
  </div>
</template>

<script>
import { uploadImage } from '../services/imageService'
import { db } from '../services/firebase'

export default {
  data() {
    return {
      title: '',
      content: '',
      bannerFile: null,
      thumbnailFile: null,
    }
  },
  methods: {
    handleBannerUpload(event) {
      this.bannerFile = event.target.files[0]
    },
    handleThumbnailUpload(event) {
      this.thumbnailFile = event.target.files[0]
    },
    async createPost() {
      try {
        const bannerUrl = await uploadImage(this.bannerFile)
        const thumbnailUrl = await uploadImage(this.thumbnailFile)

        await db.collection('posts').add({
          title: this.title,
          content: this.content,
          bannerUrl,
          thumbnailUrl,
          createdAt: new Date(),
        })

        alert('Post creado exitosamente!')
        this.$router.push('/')
      } catch (error) {
        console.error('Error al crear el post:', error)
      }
    },
  },
}
</script>

<style scoped>
.create-post {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
