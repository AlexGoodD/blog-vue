<!-- eslint-disable vue/block-lang -->
<template>
  <div @click="openPost">
    <img :src="post.thumbnailImageURL" alt="Miniatura" />
    <h3>{{ post.title }}</h3>
    <p>Por: {{ post.author }}</p>
  </div>
</template>

<script>
export default {
  props: { post: Object },
  methods: {
    openPost() {
      this.$router.push(`/post/${this.post.id}`)
    },
  },
}
</script>
