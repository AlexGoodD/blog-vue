import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import BlogDetails from '../pages/BlogDetails.vue'
import CreatePost from '../pages/CreatePost.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import { auth } from '../services/firebase'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/post/:id', name: 'BlogDetails', component: BlogDetails },
  { path: '/create', name: 'CreatePost', component: CreatePost, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Middleware para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!auth.currentUser
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
