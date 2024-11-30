<template>
  <div class="create-post">
    <div class="steps">
      <div class="step-indicators">
        <span
          v-for="(step, index) in steps"
          :key="index"
          :class="{ active: currentStep === index }"
          @click="changeStep(index)"
        ></span>
      </div>
      <component :is="steps[currentStep].component" v-bind="stepProps" />
    </div>

    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script>
import StepOne from './CreatePost_1.vue'
import StepTwo from './CreatePost_2.vue'
import StepThree from './CreatePost_3.vue'
import { uploadImage } from '../services/imageService.js'
import { auth, db } from '../services/firebase'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      currentStep: 0,
      title: '',
      content: '',
      bannerFile: null,
      thumbnailFile: null,
      authorName: 'Anónimo',
      loading: false,
      steps: [
        { name: 'Detalles', component: StepOne },
        { name: 'Imágenes', component: StepTwo },
        { name: 'Previsualización', component: StepThree },
      ],
    }
  },
  async created() {
    try {
      const user = auth.currentUser
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          this.authorName = `${userData.firstName} ${userData.lastName.split(' ')[0]}`
        } else {
          console.error('No se encontraron datos del usuario.')
        }
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error)
    }
  },
  computed: {
    stepProps() {
      return {
        title: this.title,
        content: this.content,
        bannerFile: this.bannerFile,
        thumbnailFile: this.thumbnailFile,
        authorName: this.authorName,
        onTitleChange: (value) => (this.title = value),
        onContentChange: (value) => (this.content = value),
        onBannerChange: (file) => (this.bannerFile = file),
        onThumbnailChange: (file) => (this.thumbnailFile = file),
        onPublish: this.publishPost,
      }
    },
  },
  methods: {
    async publishPost() {
      this.loading = true
      try {
        const bannerUrl = this.bannerFile ? await uploadImage(this.bannerFile) : null
        const thumbnailUrl = this.thumbnailFile ? await uploadImage(this.thumbnailFile) : null

        const blogPostCollection = collection(db, 'blogPost')
        await addDoc(blogPostCollection, {
          title: this.title,
          content: this.content,
          bannerUrl,
          thumbnailUrl,
          author: this.authorName,
          userId: auth.currentUser?.uid || null,
          createdAt: new Date(),
        })

        alert('Post creado exitosamente!')
        this.$router.push('/')
      } catch (error) {
        console.error('Error al publicar el post:', error)
        alert('Error al publicar. Intenta nuevamente.')
      } finally {
        this.loading = false // Ocultar la barra de progreso
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },
    changeStep(index) {
      this.currentStep = index
    },
  },
  components: {
    StepOne,
    StepTwo,
    StepThree,
  },
}
</script>

<style scoped>
.step-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.step-indicators span {
  width: 15px;
  height: 15px;
  border: 2px solid gray;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.step-indicators span.active {
  background-color: white;
  border-color: black;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ddd;
  border-top: 5px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
