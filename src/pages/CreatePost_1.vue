<template>
  <div class="title-content">
    <h1>Selecciona una categoría, coloca un título y un cuerpo</h1>

    <div class="categories">
      <button
        v-for="category in categories"
        :key="category"
        :class="['category-item', { active: localCategory === category }]"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </div>

    <input id="title" v-model="localTitle" type="text" placeholder="Título" required />

    <textarea
      id="content"
      v-model="localContent"
      placeholder="Comienza con una frase interesante..."
      required
    ></textarea>
  </div>
</template>

<script>
export default {
  props: ['title', 'content', 'category', 'onTitleChange', 'onContentChange', 'onCategoryChange'],
  data() {
    return {
      localTitle: this.title,
      localContent: this.content,
      localCategory: this.category,
      categories: ['Tecnología', 'Maquillaje', 'Deporte', 'Programación', 'Ingeniería', 'Escuela'],
    }
  },
  methods: {
    selectCategory(category) {
      this.localCategory = category
      this.onCategoryChange(category)
    },
  },
  watch: {
    localTitle(newVal) {
      this.onTitleChange(newVal)
    },
    localContent(newVal) {
      this.onContentChange(newVal)
    },
  },
}
</script>

<style scoped>
.title-content {
  padding-right: 50px;
  padding-left: 50px;
}

.title-content h1 {
  text-align: center;
}

.categories {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  margin-bottom: 3px;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
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

#title {
  margin-bottom: 50px;
}

input {
  width: 100%;
  padding: 0px;
  border: none;
  background-color: #353535;
  border-radius: 25px;
  font-size: 16px;
  box-sizing: border-box;
  color: white;
  padding: 15px;
  font-weight: bold;
}

textarea {
  min-width: 100%;
  padding: 20px;
  border: none;
  background-color: #353535;
  border-radius: 25px;
  font-size: 14px;
  box-sizing: border-box;
  color: white;
  min-height: 300px;
  resize: none;
}

input:focus {
  outline: none;
}
</style>
