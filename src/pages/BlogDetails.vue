<template>
  <div class="blog-details">
    <h1>{{ post.title }}</h1>
    <p><strong>Autor:</strong> {{ post.author }}</p>
    <img :src="post.bannerUrl" alt="Banner del Blog" />
    <p>{{ post.content }}</p>

    <h3>Comentarios</h3>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <strong>{{ comment.author }}:</strong> {{ comment.text }}
      </li>
    </ul>

    <form @submit.prevent="addComment">
      <textarea v-model="newComment" placeholder="Escribe un comentario"></textarea>
      <button type="submit">Agregar Comentario</button>
    </form>
  </div>
</template>

<script>
import { db } from '../services/firebase'

export default {
  data() {
    return {
      post: {},
      comments: [],
      newComment: '',
    }
  },
  async created() {
    const postId = this.$route.params.id

    // Obtener los detalles del post
    const postDoc = await db.collection('posts').doc(postId).get()
    this.post = { id: postDoc.id, ...postDoc.data() }

    // Obtener los comentarios del post
    const commentsSnapshot = await db.collection('posts').doc(postId).collection('comments').get()
    this.comments = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  },
  methods: {
    async addComment() {
      const postId = this.$route.params.id

      await db.collection('posts').doc(postId).collection('comments').add({
        text: this.newComment,
        author: 'Usuario Anónimo', // Aquí podrías usar el nombre del usuario autenticado
        createdAt: new Date(),
      })

      // Recargar comentarios
      const commentsSnapshot = await db.collection('posts').doc(postId).collection('comments').get()
      this.comments = commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      this.newComment = ''
    },
  },
}
</script>

<style scoped>
.blog-details {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.blog-details img {
  max-width: 100%;
  height: auto;
  margin: 20px 0;
}
</style>
