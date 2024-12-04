<template>
  <div>
    <h1>Comentarios</h1>
    <CommentInput :onCommentSubmit="addComment" />
    <ul class="comments-list">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @onEdit="editComment"
        @onDelete="confirmDelete"
      />
    </ul>
  </div>
</template>

<script>
import { db, auth } from '../services/firebase'
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import CommentInput from './CommentInput.vue'
import CommentItem from './CommentItem.vue'

export default {
  components: { CommentInput, CommentItem },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      showDeleteModal: false,
      deleteCommentId: null,
    }
  },
  methods: {
    async fetchComments() {
      try {
        const commentsQuery = query(
          collection(db, 'blogPost', this.postId, 'comments'),
          orderBy('createdAt', 'desc'),
        )
        const commentsSnapshot = await getDocs(commentsQuery)
        this.comments = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log('Comentarios cargados:', this.comments)
      } catch (error) {
        console.error('Error al cargar comentarios:', error)
      }
    },
    async addComment(newComment) {
      try {
        if (!auth.currentUser) {
          alert('Debes iniciar sesión para agregar un comentario.')
          return
        }

        await addDoc(collection(db, 'blogPost', this.postId, 'comments'), {
          text: newComment,
          author: auth.currentUser.email || 'Usuario Anónimo',
          createdAt: new Date(),
          userId: auth.currentUser?.uid || null,
        })
        this.fetchComments()
      } catch (error) {
        console.error('Error al agregar comentario:', error)
      }
    },
    async editComment(commentId, updatedText) {
      try {
        const commentRef = doc(db, 'blogPost', this.postId, 'comments', commentId)
        await updateDoc(commentRef, { text: updatedText })
        console.log(`Comentario ${commentId} actualizado con texto: ${updatedText}`)
        this.fetchComments()
      } catch (error) {
        console.error('Error al actualizar comentario:', error)
        alert('Hubo un error al actualizar el comentario.')
      }
    },
    confirmDelete(commentId) {
      const confirmation = confirm('¿Estás seguro de que deseas eliminar este comentario?')
      if (!confirmation) return
      this.deleteComment(commentId)
    },
    async deleteComment(commentId) {
      try {
        const commentRef = doc(db, 'blogPost', this.postId, 'comments', commentId)
        await deleteDoc(commentRef)
        console.log('Comentario eliminado:', commentId)
        this.fetchComments()
      } catch (error) {
        console.error('Error al eliminar comentario:', error)
      }
    },
  },
  created() {
    this.fetchComments()
  },
}
</script>

<style scoped>
.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
