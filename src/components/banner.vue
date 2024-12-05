<template>
  <div class="carousel" v-if="posts.length > 0">
    <div class="carousel-container">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div
          v-for="(post, index) in posts"
          :key="index"
          class="carousel-item"
          @click="$router.push(`/post/${post.id}`)"
        >
          <img :src="post.bannerUrl || 'default-banner.jpg'" :alt="post.title || 'Banner'" />
        </div>
      </div>
    </div>
    <StepIndicator
      :steps="posts.slice(0, 3)"
      :currentStep="currentIndex"
      @update:currentStep="goToSlide"
    />
  </div>
</template>

<script>
import StepIndicator from '../components/Selector.vue'

export default {
  components: {
    StepIndicator,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      autoSlideInterval: null,
    }
  },
  methods: {
    goToSlide(index) {
      this.$emit('update:currentIndex', index)
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        const nextIndex = (this.currentIndex + 1) % this.posts.length
        this.goToSlide(nextIndex)
      }, 5000)
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval)
      this.autoSlideInterval = null
    },
  },
  mounted() {
    if (this.posts.length > 1) {
      this.startAutoSlide()
    }
  },
  beforeDestroy() {
    this.stopAutoSlide()
  },
}
</script>

<style scoped>
.carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 80%;
  margin: 20px auto;
  overflow: hidden;
  border-radius: 25px;
  height: 400px;
}

.carousel-container {
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  will-change: transform;
}

.carousel-item {
  min-width: 100%;
  max-width: 100%;
  flex: 0 0 100%;
}

.carousel-item img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  cursor: pointer;
}
</style>
