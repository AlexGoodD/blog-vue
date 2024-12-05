import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import BlogDetails from '../pages/BlogDetails.vue'
import EditBlog from '../pages/EditBlog.vue'
import CreatePost from '../pages/CreatePost.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import { auth } from '../services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import ProfilePage from '../pages/Profile.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/post/:id', name: 'BlogDetails', component: BlogDetails },
  { path: '/edit/:id', name: 'EditBlog', component: EditBlog, meta: { requiresAuth: true } },
  { path: '/create', name: 'CreatePost', component: CreatePost, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/user', name: 'User', component: ProfilePage, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Variable para controlar la inicialización del estado de autenticación
let isAuthChecked = false

// Middleware para proteger rutas
router.beforeEach((to, from, next) => {
  if (!isAuthChecked) {
    onAuthStateChanged(auth, (user) => {
      isAuthChecked = true // Marcar que ya se verificó el estado de autenticación
      const isAuthenticated = !!user
      if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login' })
      } else {
        next()
      }
    })
  } else {
    const isAuthenticated = !!auth.currentUser
    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ name: 'Login' })
    } else {
      next()
    }
  }
})

export default router
