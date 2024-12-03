<template>
  <div class="carousel" v-if="posts.length > 0">
    <div class="banner" v-if="currentBanner" @click="$router.push(`/post/${currentBanner?.id}`)">
      <img
        :src="currentBanner?.bannerUrl || 'default-banner.jpg'"
        :alt="currentBanner?.title || 'Banner'"
      />
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
  computed: {
    currentBanner() {
      return this.posts[this.currentIndex]
    },
  },
  methods: {
    goToSlide(index) {
      this.$emit('update:currentIndex', index)
    },
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
  max-width: 1200px;
  margin: 20px auto;
}

.banner {
  width: 100%;
  max-width: 1200px;
  height: 350px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 20px;
}

.banner img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
</style>
