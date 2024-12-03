<template>
  <div class="blog-card">
    <div class="thumbnail">
      <img :src="post.thumbnailUrl || '/default-thumbnail.jpg'" alt="Miniatura" />
      <div class="author-tag">{{ post.author || 'Anónimo' }}</div>
    </div>
    <div class="blog-content">
      <h3>{{ post.title || 'Sin título' }}</h3>
      <p class="content">{{ truncatedContent }}</p>
      <hr />
      <div class="meta-info">
        <div class="date">
          <span class="material-symbols-outlined"> calendar_month </span>
          {{ formattedDate }}
        </div>
      </div>
      <button class="read-more" @click="openPost">Leer más</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { post: Object },
  computed: {
    formattedDate() {
      if (this.post.createdAt) {
        const date = new Date(this.post.createdAt.seconds * 1000)
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
      }
      return 'dd/mm/yyyy'
    },
    truncatedContent() {
      const maxLength = 100
      return this.post.content?.length > maxLength
        ? this.post.content.substring(0, maxLength) + '...'
        : this.post.content || 'Sin contenido'
    },
  },
  methods: {
    openPost() {
      if (this.post.id) {
        this.$router.push(`/post/${this.post.id}`)
      }
    },
  },
}
</script>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 20px;
  width: 300px;
  margin: 15px auto;
  color: white;
  text-align: center;
}

.thumbnail {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
}

.thumbnail img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 50px;
}

.author-tag {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.blog-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  text-align: left;
  margin-top: 20px;
}

h3 {
  font-size: 18px;
  margin: 10px 0;
}

.content {
  font-size: 14px;
  color: #a3a3a3;
  margin: 10px 0;
}

.meta-info {
  display: flex;
  justify-content: left;
  align-items: left;
  gap: 5px;
  margin: 10px 0;
}

hr {
  color: #343434;
  width: 100%;
}

.date {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #a3a3a3;
}

.read-more {
  background-color: transparent;
  color: #a3a3a3;
  border: 1px solid #a3a3a3;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  justify-content: center;
  align-items: center;
}

.read-more:hover {
  background-color: white;
  color: #141414;
}
</style>
