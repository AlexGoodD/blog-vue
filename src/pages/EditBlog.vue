<template>
  <div class="blog-edit">
    <img :src="post.bannerUrl" alt="Banner del Blog" />
    <h1>
      <input
        v-model="post.title"
        type="text"
        class="editable-title"
        placeholder="Título del Blog"
      />
    </h1>
    <textarea
      v-model="post.content"
      class="editable-content"
      placeholder="Contenido del Blog"
    ></textarea>
    <hr />
    <div class="detalles">
      <p><strong>Autor:</strong> {{ post.author }}</p>
      <p><strong>Fecha de creación:</strong> {{ formattedDate }}</p>
    </div>

    <button @click="updatePost" class="update-btn">Guardar Cambios</button>
  </div>
</template>

<script>
import { db } from '../services/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      post: { title: '', content: '', bannerUrl: '', author: '' },
    }
  },
  computed: {
    formattedDate() {
      if (this.post.createdAt?.seconds) {
        const date = new Date(this.post.createdAt.seconds * 1000)
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }
      return 'Fecha no disponible'
    },
  },
  async created() {
    const postId = this.$route.params.id
    try {
      const postDoc = await getDoc(doc(db, 'blogPost', postId))
      if (postDoc.exists()) {
        this.post = { id: postDoc.id, ...postDoc.data() }
      } else {
        alert('El post no existe')
        this.$router.push('/')
      }
    } catch (error) {
      console.error('Error al cargar el post:', error)
    }
  },
  methods: {
    async updatePost() {
      if (!this.post.title.trim()) {
        alert('El título no puede estar vacío.')
        return
      }
      if (!this.post.content.trim()) {
        alert('El contenido no puede estar vacío.')
        return
      }
      if (!this.post.bannerUrl.trim()) {
        alert('El banner no puede estar vacío.')
        return
      }

      const postId = this.$route.params.id
      try {
        await updateDoc(doc(db, 'blogPost', postId), {
          title: this.post.title,
          content: this.post.content,
        })
        alert('El post ha sido actualizado exitosamente.')
        this.$router.push(`/post/${postId}`)
      } catch (error) {
        console.error('Error al actualizar el post:', error)
        alert('Hubo un error al actualizar el post.')
      }
    },
  },
}
</script>

<style scoped>
.blog-edit {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.blog-edit img {
  max-width: 100%;
  height: auto;
  margin: 20px 0;
}

.editable-title {
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  padding: 15px;
  border: none;
  border-radius: 25px;
  margin-bottom: 20px;
  background-color: #353535;
  color: white;
}

.editable-content {
  width: 100%;
  height: 350px;
  padding: 15px;
  border: none;
  border-radius: 25px;
  resize: none;
  margin-bottom: 20px;
  font-size: 15px;
  line-height: 1.6;
  background-color: #353535;
  color: white;
}

.detalles {
  color: #a3a3a3;
  margin-top: 20px;
}

.detalles strong {
  color: white;
}

.update-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
}

.update-btn:hover {
  background-color: #0056b3;
}
</style>
