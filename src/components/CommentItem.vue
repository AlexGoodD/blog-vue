<template>
  <li class="comment-item">
    <div class="comment-avatar">
      {{ comment.author.charAt(0).toUpperCase() }}
    </div>
    <div class="comment-content">
      <div v-if="isEditing">
        <textarea v-model="editedText" class="edit-textarea" @input="autoResize($event)"></textarea>
        <div class="confirm-buttons">
          <button @click="cancelEdit" class="cancel">Cancelar</button>
          <button @click="saveEdit" class="save">Guardar</button>
        </div>
      </div>
      <div v-else class="comment-bubble">
        <strong>{{ comment.author }}</strong>
        <span class="comment-date">{{ formattedDate }}</span>
        <p>{{ comment.text }}</p>
      </div>
    </div>
    <div v-if="canEdit && !isEditing" class="comment-menu">
      <button @click="toggleMenu" class="menu-button">
        <span class="material-symbols-outlined">more_vert</span>
      </button>
      <div v-if="isMenuOpen" class="menu-options">
        <button @click="enableEdit">Editar</button>
        <button @click="emitDelete">Eliminar</button>
      </div>
    </div>
  </li>
</template>

<script>
import { auth } from '../services/firebase'

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    onEdit: {
      type: Function,
      required: true,
    },
    onDelete: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      editedText: this.comment.text,
      isMenuOpen: false,
    }
  },
  computed: {
    canEdit() {
      return auth.currentUser?.email === this.comment.author
    },
    formattedDate() {
      if (this.comment.createdAt?.seconds) {
        const date = new Date(this.comment.createdAt.seconds * 1000)
        return date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      }
      return 'Fecha desconocida'
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    enableEdit() {
      this.isEditing = true
      this.isMenuOpen = false
    },
    cancelEdit() {
      this.isEditing = false
      this.editedText = this.comment.text
    },
    saveEdit() {
      if (!this.editedText.trim()) {
        alert('El comentario no puede estar vacío.')
        return
      }
      this.isEditing = false
      this.$emit('onEdit', this.comment.id, this.editedText)
    },
    emitDelete() {
      this.$emit('onDelete', this.comment.id)
      this.isMenuOpen = false
    },
    autoResize(event) {
      const textarea = event.target
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    },
    enableEdit() {
      this.isEditing = true
      this.$nextTick(() => {
        const textarea = this.$el.querySelector('.edit-textarea')
        if (textarea) {
          textarea.style.height = 'auto'
          textarea.style.height = `${textarea.scrollHeight}px`
        }
      })
    },
  },
}
</script>

<style scoped>
.comment-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  position: relative;
  margin-bottom: 20px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #353535;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  text-align: center;
  line-height: 1;
  box-sizing: border-box;
}

.comment-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
}

.comment-bubble {
  color: white;
  max-width: 80%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  padding: 10px;
  background-color: #353535;
  border-radius: 10px;
  margin-bottom: 10px;
  align-self: flex-start;
}

.comment-menu {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.comment-date {
  font-size: 13px;
  opacity: 0.5;
  margin-left: 10px;
}
.menu-button {
  background: none;
  border: none;
  cursor: pointer;
}

.menu-button span {
  font-size: 20px;
  color: #838383;
}

.menu-button span:hover {
  color: white;
}

.menu-options {
  position: absolute;
  top: 0;
  right: 30px;
  background-color: #353535;
  border: none;
  border-radius: 10px;
  z-index: 10;
  color: white;
}
.menu-options button {
  display: block;
  padding: 10px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
.menu-options button:hover {
  background-color: #555;
}
.edit-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.edit-textarea {
  flex: 1;
  min-width: 100%;
  min-height: 150%;
  background-color: transparent;
  margin-bottom: -10px;
  color: white;
  outline: none;
  resize: none;
  border: none;
  border-bottom: 1px solid white;
  font-size: 14px;
}

.confirm-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel,
.save {
  font-weight: bold;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.save {
  padding: 10px;
  border-radius: 20px;
  background-color: #2f2f2f;
  color: #fff;
}

.save:hover {
  background-color: #424242;
}
</style>
