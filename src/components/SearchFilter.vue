<template>
  <div class="filters">
    <div class="search-container">
      <span class="material-symbols-outlined search-icon">search</span>
      <input
        v-model="localSearchQuery"
        type="text"
        placeholder="Buscar por título, contenido o autor..."
        class="search-input"
      />
    </div>

    <div v-if="!isSmallScreen" class="categories">
      <button
        v-for="category in categories"
        :key="category"
        :class="['category-item', { active: selectedCategory === category }]"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </div>

    <div v-else class="dropdown-container">
      <select
        :value="selectedCategory"
        @change="selectCategory($event.target.value)"
        class="category-dropdown"
      >
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
    selectedCategory: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:searchQuery', 'update:selectedCategory'],
  data() {
    return {
      localSearchQuery: this.searchQuery,
      isSmallScreen: window.innerWidth <= 1200,
    }
  },
  watch: {
    localSearchQuery(newVal) {
      this.$emit('update:searchQuery', newVal)
    },
  },
  methods: {
    selectCategory(category) {
      this.$emit('update:selectedCategory', category)
    },
    handleResize() {
      this.isSmallScreen = window.innerWidth <= 1200
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  background-color: #353535;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  color: white;
}

.search-icon {
  margin-left: 10px;
  font-size: 25px;
  color: #a3a3a3;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: none;
  color: white;
}

.search-input::placeholder {
  color: #a3a3a3;
  font-size: 14px;
}

.categories {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
}

.category-item {
  padding: 5px 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: #555;
  position: relative;
  transition: all 0.3s ease;
}

.category-item.active {
  color: white;
}

.category-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #007bff;
  border-radius: 20px;
  z-index: -1;
}

.dropdown-container {
  width: 50%;
  padding: 5px 10px;
}

.category-dropdown {
  width: 100%;
  padding: 5px;
  font-size: 14px;
  border-radius: 10px;
  background-color: #353535;
  color: white;
  border: none;
  outline: none;
}

.category-dropdown option {
  background-color: #353535;
  color: white;
}
</style>
