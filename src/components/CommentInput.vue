<template>
  <form @submit.prevent="handleSubmit" class="comment-form">
    <div class="input-wrapper">
      <textarea v-model="newComment" placeholder="Escribe un comentario"></textarea>
      <button type="submit" class="send-button">
        <span class="material-symbols-outlined">send</span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    onCommentSubmit: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      newComment: '',
    }
  },
  methods: {
    handleSubmit() {
      if (!this.newComment.trim()) {
        alert('El comentario no puede estar vacío.')
        return
      }
      this.onCommentSubmit(this.newComment)
      this.newComment = ''
    },
  },
}
</script>

<style scoped>
.comment-form {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

textarea {
  flex: 1;
  border-radius: 25px;
  padding: 10px;
  font-size: 14px;
  resize: none;
  background-color: #353535;
  color: white;
  border: none;
  outline: none;
  height: 20px;
}

textarea::placeholder {
  color: #a3a3a3;
}

textarea:focus {
  border-color: #007bff;
}

.send-button {
  border: none;
  background-color: #353535;
  color: white;
  border-radius: 100%;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  width: 5%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-button span {
  font-size: 20px;
}

.send-button:hover {
  background-color: #5a5a5a;
}

.send-button:focus {
  outline: none;
  border-color: #007bff;
}
</style>
