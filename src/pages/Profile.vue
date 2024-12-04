<template>
  <div class="user-page">
    <div class="user-info">
      <h1>Mi perfil</h1>
      <div class="user-details">
        <p><strong>Nombre:</strong> {{ userName }}</p>
        <p><strong>Email:</strong> {{ userEmail }}</p>
      </div>
      <a href="javascript:void(0)" @click="logout" class="link">Cerrar sesión</a>
    </div>

    <div class="content-selector">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: currentTab === tab.value }"
        @click="currentTab = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="content-display">
      <template v-if="currentTab === 'posts'">
        <div class="blog-card-container">
          <BlogCard v-for="post in userPosts" :key="post.id" :post="post" />
        </div>
      </template>

      <template v-if="currentTab === 'comments'">
        <div class="comments-container">
          <div class="comment-card" v-for="comment in userComments" :key="comment.id">
            <div class="comment-header">
              <p class="author">
                <strong>{{ comment.author || 'Anónimo' }}</strong>
              </p>
            </div>
            <div class="comment-body">
              <p>{{ comment.text }}</p>
            </div>
            <div class="comment-footer">
              <small class="comment-date">{{ formattedDate(comment.createdAt) }}</small>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { auth, db } from '../services/firebase'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import BlogCard from '../components/BlogCard.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'UserPage',
  components: {
    BlogCard,
  },
  setup() {
    const userName = ref('')
    const userEmail = ref('')
    const userPosts = ref([])
    const userComments = ref([])
    const currentTab = ref('posts')
    const tabs = ref([
      { label: 'Mis post', value: 'posts' },
      { label: 'Mis comentarios', value: 'comments' },
    ])
    const router = useRouter()

    const fetchUserData = async () => {
      const user = auth.currentUser
      if (user) {
        const userDocRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          userName.value = `${userData.firstName} ${userData.lastName.split(' ')[0]}`
          userEmail.value = userData.email
        }
      }
    }

    const fetchUserPosts = async () => {
      const user = auth.currentUser
      if (user) {
        const postsQuery = query(collection(db, 'blogPost'), where('userId', '==', user.uid))
        const querySnapshot = await getDocs(postsQuery)
        userPosts.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      }
    }

    const fetchUserComments = async () => {
      const user = auth.currentUser
      if (user) {
        try {
          const postsSnapshot = await getDocs(collection(db, 'blogPost'))
          const comments = []

          for (const postDoc of postsSnapshot.docs) {
            const commentsQuery = query(
              collection(db, 'blogPost', postDoc.id, 'comments'),
              where('userId', '==', user.uid),
            )
            const commentsSnapshot = await getDocs(commentsQuery)

            commentsSnapshot.forEach((commentDoc) => {
              comments.push({
                id: commentDoc.id,
                postId: postDoc.id,
                postTitle: postDoc.data().title,
                createdAt: commentDoc.data().createdAt,
                ...commentDoc.data(),
              })
            })
          }

          userComments.value = comments
        } catch (error) {
          console.error('Error al cargar los comentarios:', error)
        }
      } else {
        console.error('El usuario no está autenticado.')
      }
    }

    const formattedDate = (createdAt) => {
      if (createdAt?.seconds) {
        const date = new Date(createdAt.seconds * 1000)
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }
      return 'Fecha desconocida'
    }

    onMounted(() => {
      fetchUserData()
      fetchUserPosts()
      fetchUserComments()
    })

    const logout = async () => {
      try {
        await auth.signOut()
        router.push('/')
        alert('Has cerrado sesión')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
    }

    return {
      userName,
      userEmail,
      userPosts,
      userComments,
      currentTab,
      tabs,
      logout,
      formattedDate,
    }
  },
}
</script>

<style scoped>
.user-page {
  max-width: 90%;
  margin: 0 0 0 1%;
  padding: 2%;
  font-family: Arial, sans-serif;
}

.user-info {
  text-align: left;
  margin-bottom: 2%;
}

.user-info h1 {
  text-align: center;
  font-size: 2rem;
}

.user-details p {
  margin: 1% 0;
  font-size: 1rem;
}

.content-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 2%;
  gap: 2%;
}

.content-selector button {
  padding: 1%;
  width: 25%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.content-selector button.active {
  border-bottom: 0.2rem solid #007bff;
}

.content-display {
  margin-top: 2%;
}

.blog-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  gap: 2%;
  margin-top: 2%;
}

@media (max-width: 880px) {
  .blog-card-container {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
}

.comments-container {
  list-style: none;
  padding: 0;
}

.comment-card {
  background-color: #353535;
  border-radius: 0.5rem;
  padding: 2%;
  width: 100%;
  margin-bottom: 2%;
}

.comment-item {
  display: flex;
  align-items: flex-start;
  gap: 2%;
  margin-bottom: 2%;
}

.comment-content {
  border-radius: 0.5rem;
  padding: 1%;
  color: white;
  flex: 1;
}

.comment-date {
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
