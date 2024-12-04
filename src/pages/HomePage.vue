<template>
  <div class="homepage">
    <div v-if="isLoading" class="loading">Cargando posts...</div>
    <div v-else>
      <div class="header">
        <h1>Encuentra Un Blog A Tu Medida</h1>
        <p class="subtitle">
          Hay nuevos blogs todos los días, encuentra alguno de tu interés filtrando por categoría o
          busca un tema en específico.
        </p>
      </div>

      <SearchFilter
        class="search_filter"
        :searchQuery="searchQuery"
        :selectedCategory="selectedCategory"
        :categories="categories"
        @update:searchQuery="(value) => (searchQuery = value)"
        @update:selectedCategory="(value) => (selectedCategory = value)"
      />

      <div v-if="!searchQuery.trim() && selectedCategory === 'Todos'">
        <h4>Recientes</h4>
        <banner
          :posts="filteredPosts.slice(0, 3)"
          :currentIndex="currentIndex"
          @update:currentIndex="(index) => (currentIndex = index)"
        />
      </div>

      <div class="thumbnails" v-if="filteredPosts.length > 0">
        <BlogCard v-for="post in filteredPosts" :key="post.id" :post="post" />
      </div>

      <div v-else class="no-results">
        <p>No se encontraron resultados para tu búsqueda o filtro.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'
import BlogCard from '../components/BlogCard.vue'
import banner from '../components/banner.vue'
import SearchFilter from '../components/SearchFilter.vue'

// Variables principales
const posts = ref([])
const isLoading = ref(true)
const currentIndex = ref(0)
const searchQuery = ref('')
const selectedCategory = ref('Todos')
const categories = ref([
  'Todos',
  'Tecnología',
  'Maquillaje',
  'Deporte',
  'Programación',
  'Ingeniería',
  'Escuela',
])

const fetchPosts = async () => {
  isLoading.value = true
  try {
    const q = query(collection(db, 'blogPost'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)

    posts.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error al obtener los posts:', error)
  } finally {
    isLoading.value = false
  }
}

const filteredPosts = computed(() => {
  if (!posts.value.length) return []

  let filtered = posts.value

  if (selectedCategory.value !== 'Todos') {
    filtered = filtered.filter((post) => post.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const searchLower = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower),
    )
  }

  return filtered
})

onMounted(fetchPosts)
</script>

<style scoped>
.homepage {
  max-width: 100%;
  margin: 0 auto;
  padding: 2%;
  overflow-x: hidden;
}

.header {
  text-align: left;
  padding-left: 10%;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 2.5% 5% 0;
}

.header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

h4 {
  text-align: center;
}

.header .subtitle {
  font-size: 1rem;
  color: #a3a3a3;
  line-height: 1.6;
  padding-right: 40%;
}

.loading {
  text-align: center;
  font-size: 1.25rem;
  color: #888;
}

.filters {
  display: flex;
  gap: 2%;
  margin-bottom: 2%;
  padding-left: 5%;
  margin-top: -5%;
}

.search_filter {
  padding-left: 10%;
  width: 100%;
}

@media (max-width: 880px) {
  .filters {
    padding: 0;
  }
  .header {
    padding: 5%;
  }
  .subtitle {
    padding: 5;
    width: 100%;
  }
}

/* Indicadores del banner */
.indicators {
  display: flex;
  justify-content: center;
  gap: 1%;
  margin-top: 1%;
}

.indicator {
  width: 0.625rem; /* 10px */
  height: 0.625rem;
  border: 0.125rem solid gray; /* 2px */
  border-radius: 50%;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
}

.indicator.active {
  width: 0.75rem; /* 12px */
  height: 0.75rem;
  background-color: white;
  border-color: white;
}

.indicator:hover {
  transform: scale(1.2);
}

/* Miniaturas */
.thumbnails {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr)); /* Responsive */
  gap: 2%;
  max-width: 90%;
  margin: auto;
  padding: 2%;
}

@media (max-width: 1000px) {
  .thumbnails {
    grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  }
}

@media (max-width: 750px) {
  .thumbnails {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
}

/* No resultados */
.no-results {
  text-align: center;
  font-size: 1.125rem;
  color: #555;
  margin-top: 2%;
}
</style>
