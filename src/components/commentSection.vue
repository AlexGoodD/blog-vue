<!-- eslint-disable vue/block-lang -->
<template>
  <div>
    <h4>Comentarios</h4>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <p>
          <strong>{{ comment.author }}</strong
          >: {{ comment.text }}
        </p>
      </li>
    </ul>
    <textarea v-model="newComment"></textarea>
    <button @click="addComment">Agregar</button>
  </div>
</template>

<script>
export default {
  props: { postId: String },
  data() {
    return { comments: [], newComment: '' }
  },
  methods: {
    async fetchComments() {
      const snapshot = await this.$firestore
        .collection('posts')
        .doc(this.postId)
        .collection('comments')
        .get()
      this.comments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },
    async addComment() {
      await this.$firestore.collection('posts').doc(this.postId).collection('comments').add({
        text: this.newComment,
        author: firebase.auth().currentUser.displayName,
        createdAt: new Date(),
      })
      this.newComment = ''
      this.fetchComments()
    },
  },
  created() {
    this.fetchComments()
  },
}
</script>
