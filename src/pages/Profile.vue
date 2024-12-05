<template>
  <div class="user-page">
    <div class="user-info">
      <div class="header">
        <h1>Mi perfil</h1>
        <div class="buttons-header">
          <button @click="toggleEditInfo">
            <span class="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>
      <h2>Datos personales</h2>
      <div class="user-details">
        <p v-if="showEditInfo"><strong>Nombres</strong></p>
        <p v-else><strong>Nombre completo</strong></p>
        <input v-if="showEditInfo" type="text" v-model="firstName" class="input" />
        <p v-else>{{ userName }}</p>
        <p v-if="showEditInfo"><strong>Apellidos</strong></p>
        <input v-if="showEditInfo" type="text" v-model="lastName" class="input" />
        <p><strong>Correo electrónico</strong></p>
        <p>{{ userEmail }}</p>
        <button class="btn-save" @click="handleUpdateInfo" v-if="showEditInfo">
          Guardar cambios
        </button>
      </div>

      <div v-if="showEditInfo" class="header" id="checkbox">
        <p>Cambiar contraseña</p>
        <input
          type="checkbox"
          @click="toggleEditPass"
          v-model="showEditPass"
          id="scales"
          name="scales"
        />
      </div>

      <template v-if="showEditPass">
        <div class="password-section">
          <h2>Cambiar contraseña</h2>
          <p><strong>Contraseña actual</strong></p>
          <input
            type="password"
            v-model="currentPassword"
            placeholder="Contraseña actual"
            class="input"
          />
          <p><strong>Nueva contraseña</strong></p>
          <input
            type="password"
            v-model="newPassword"
            placeholder="Nueva contraseña"
            class="input"
          />
          <button class="btn-save" @click="handleChangePassword">Cambiar contraseña</button>
        </div>
      </template>

      <a href="javascript:void(0)" @click="logout" class="link">Cerrar sesión</a>
    </div>

    <!-- Selector -->
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
          <router-link
            v-for="comment in userComments"
            :key="comment.id"
            :to="`/post/${comment.postId}`"
            class="comment-card"
          >
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
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { auth, db } from '../services/firebase'
import { doc, getDoc, query, where, collection, getDocs } from 'firebase/firestore'
import { updateName, changePassword } from '../services/authService'
import { logout as logoutService } from '../services/authService'
import { useRouter } from 'vue-router'
import BlogCard from '../components/BlogCard.vue'

export default {
  name: 'UserPage',
  components: {
    BlogCard,
  },
  setup() {
    const userName = ref('')
    const firstName = ref('')
    const lastName = ref('')
    const userEmail = ref('')
    const currentPassword = ref('')
    const newPassword = ref('')
    const userPosts = ref([])
    const userComments = ref([])
    const currentTab = ref('posts')
    const tabs = ref([
      { label: 'Mis post', value: 'posts' },
      { label: 'Mis comentarios', value: 'comments' },
    ])
    const showEditInfo = ref(false)
    const showEditPass = ref(false)

    const fetchUserData = async () => {
      const user = auth.currentUser
      if (user) {
        const userDocRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          userName.value = `${userData.firstName} ${userData.lastName.split(' ')[0]}`
          firstName.value = userData.firstName
          lastName.value = userData.lastName
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
                postId: postDoc.id, // Asegúrate de incluir postId
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

    const handleUpdateInfo = async () => {
      if (!firstName.value.trim() || !lastName.value.trim()) {
        alert('Por favor, completa todos los campos correctamente.')
        return
      }
      try {
        const messageName = await updateName(auth.currentUser.uid, firstName.value, lastName.value)
        userName.value = `${firstName.value} ${lastName.value}`
        alert(messageName)

        showEditInfo.value = false
      } catch (error) {
        alert(error.message)
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

    const handleChangePassword = async () => {
      try {
        const message = await changePassword(
          userEmail.value,
          currentPassword.value,
          newPassword.value,
        )
        alert(message)
        currentPassword.value = ''
        newPassword.value = ''
        showEditPass.value = false
      } catch (error) {
        alert(error.message)
      }
    }

    const logout = async () => {
      try {
        const message = await logoutService()
        alert(message)
        router.push('/')
      } catch (error) {
        alert(error.message)
      }
    }

    const toggleEditInfo = () => {
      showEditInfo.value = !showEditInfo.value
    }

    const toggleEditPass = () => {
      showEditPass.value = !showEditPass.value
    }

    const router = useRouter()

    onMounted(() => {
      fetchUserData()
      fetchUserPosts()
      fetchUserComments()
    })

    return {
      userName,
      userEmail,
      userPosts,
      userComments,
      currentTab,
      tabs,
      currentPassword,
      newPassword,
      showEditInfo,
      showEditPass,
      toggleEditInfo,
      toggleEditPass,
      handleUpdateInfo,
      handleChangePassword,
      logout,
      firstName,
      lastName,
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

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #a3a3a3;
  margin-left: 1rem;
}

#checkbox {
  font-weight: bold;
  gap: 3rem;
}

.user-info {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info h1 {
  font-size: 2.3rem;
}

.user-details p {
  font-size: 1rem;
  margin-bottom: 10%;
  text-align: left;
}

.user-details .input {
  background-color: #353535;
  padding: 5%;
  border-radius: 1rem;
  width: 100%;
}

.link {
  color: #ffffff;
  cursor: pointer;
  background-color: rgb(200, 0, 0);
  border-radius: 20rem;
  padding: 1%;
  margin: 2% 0;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  background-color: rgb(216, 30, 30);
}

.content-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 2%;
  gap: 2%;
}

.post-link {
  font-size: 0.9rem;
  color: white;
  margin-top: 1rem;
  opacity: 0.8;
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

.comments-container {
  list-style: none;
  padding: 0;
  margin-top: 4%;
}

.comment-card {
  background-color: #353535;
  border-radius: 2.5rem;
  padding: 0.5% 2%;
  width: 100%;
  margin-bottom: 2%;
  text-decoration: none;
  color: white;
  display: block;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.comment-card:hover {
  background-color: #444;
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

.input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10%;
  border: none;
  border-radius: 1rem;
  font-size: 14px;
  color: white;
  background-color: #353535;
}

.btn-save {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6%;
  border-radius: 1rem;
  cursor: pointer;
}

.btn-save:hover {
  background-color: #0056b3;
}

.password-section {
  margin-top: 20px;
}

@media (max-width: 880px) {
  .blog-card-container {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
}
</style>
