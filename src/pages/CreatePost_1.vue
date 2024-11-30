<template>
  <div class="title-content">
    <h1>Coloca un título y un cuerpo</h1>
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
  props: ['title', 'content', 'onTitleChange', 'onContentChange'],
  data() {
    return {
      localTitle: this.title,
      localContent: this.content,
    }
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

#title {
  margin-bottom: 50px;
}

label {
  font-size: 14px;
  text-align: left;
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
