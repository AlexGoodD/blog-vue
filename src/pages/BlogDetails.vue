<template>
  <div class="blog-details">
    <img :src="post.bannerUrl" alt="Banner del Blog" />
    <hr />
    <h1>{{ post.title }}</h1>
    <p class="content">{{ post.content }}</p>
    <hr />
    <div class="detalles">
      <div class="author">
        <span class="material-symbols-outlined"> person </span>
        {{ post.author }}
      </div>
      <div class="date">
        <span class="material-symbols-outlined"> calendar_month </span>
        {{ formattedDate }}
      </div>
    </div>
    <hr />
    <div v-if="canEdit" class="extra-section">
      <button @click="editPost">
        <span class="material-symbols-outlined">edit</span>
      </button>

      <button @click="deletePost">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>

    <CommentSection v-if="post.id" :postId="post.id" />
  </div>
</template>

<script>
import { db, auth } from '../services/firebase'
import { doc, getDoc, deleteDoc, collection, getDocs } from 'firebase/firestore'
import CommentSection from '../components/CommentSection.vue'

export default {
  components: {
    CommentSection,
  },
  data() {
    return {
      post: {},
      canEdit: false,
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
        console.log('Post cargado:', this.post)
        this.canEdit = auth.currentUser?.uid === this.post.userId
        this.scrollToTop()
      } else {
        alert('El blog no existe.')
        this.$router.push('/')
      }
    } catch (error) {
      console.error('Error al cargar los detalles del blog:', error)
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    editPost() {
      this.$router.push(`/edit/${this.post.id}`)
    },
    async deletePost() {
      const confirmation = confirm(
        '¿Estás seguro de que deseas eliminar este post y todos sus comentarios?',
      )
      if (!confirmation) return

      try {
        const postRef = doc(db, 'blogPost', this.post.id)
        const commentsRef = collection(db, 'blogPost', this.post.id, 'comments')

        const commentsSnapshot = await getDocs(commentsRef)
        const deletePromises = commentsSnapshot.docs.map((commentDoc) => deleteDoc(commentDoc.ref))
        await Promise.all(deletePromises)

        await deleteDoc(postRef)

        alert('El post y sus comentarios han sido eliminados correctamente.')
        this.$router.push('/')
      } catch (error) {
        console.error('Error al eliminar el post y sus comentarios:', error)
        alert('Hubo un error al intentar eliminar el post y sus comentarios.')
      }
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
  width: 100%;
  height: 400px;
  margin: 20px 0;
  border-radius: 25px;
}

.extra-section button {
  background-color: transparent;
  color: #a3a3a3;
  border: none;
  cursor: pointer;
}

.detalles {
  color: #a3a3a3;
}

.detalles strong {
  color: white;
}

.content {
  color: #a3a3a3;
  font-weight: 600;
  font-size: 15px;
  line-height: 200%;
}

hr {
  color: #343434;
  width: 100%;
}

.extra-section {
  display: flex;
}

.date {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #a3a3a3;
}

.author {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #a3a3a3;
}
</style>
