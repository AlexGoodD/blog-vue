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
import { db, auth } from '../services/firebase'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'
import { uploadImage } from '../services/imageService.js'

export default {
  data() {
    return {
      title: '',
      content: '',
      bannerFile: null,
      thumbnailFile: null,
      authorName: '',
    }
  },
  methods: {
    handleBannerUpload(event) {
      this.bannerFile = event.target.files[0]
    },
    handleThumbnailUpload(event) {
      this.thumbnailFile = event.target.files[0]
    },
    async fetchAuthorName() {
      if (!auth.currentUser) return null

      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          return `${userData.firstName} ${userData.lastName.split(' ')[0]}`
        } else {
          throw new Error('El usuario no tiene datos registrados.')
        }
      } catch (error) {
        console.error('Error al obtener el nombre del autor:', error)
        throw error
      }
    },
    async createPost() {
      if (!auth.currentUser) {
        alert('Debes iniciar sesión para crear un post.')
        return
      }

      if (!this.title.trim() || !this.content.trim()) {
        alert('Por favor completa todos los campos.')
        return
      }

      try {
        // Obtener el nombre del autor
        const authorName = await this.fetchAuthorName()

        // Subir imágenes a Imgbb
        const bannerUrl = this.bannerFile ? await uploadImage(this.bannerFile) : null
        const thumbnailUrl = this.thumbnailFile ? await uploadImage(this.thumbnailFile) : null

        // Agregar el documento a la colección
        const blogPostCollection = collection(db, 'blogPost')
        await addDoc(blogPostCollection, {
          title: this.title,
          content: this.content,
          bannerUrl,
          thumbnailUrl,
          author: authorName,
          userId: auth.currentUser.uid,
          createdAt: new Date(),
        })

        alert('Post creado exitosamente!')
        this.$router.push('/')
      } catch (error) {
        console.error('Error al crear el post:', error)
        alert('Hubo un error al crear el post. Intenta nuevamente.')
      }
    },
  },
}
</script>
