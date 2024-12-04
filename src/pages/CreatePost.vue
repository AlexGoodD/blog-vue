<template>
  <div class="create-post">
    <div class="steps">
      <StepIndicator
        :steps="steps"
        :currentStep="currentStep"
        @update:currentStep="(step) => (currentStep = step)"
      />
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
import StepIndicator from '../components/Selector.vue'
import { uploadImage } from '../services/imageService.ts'
import { auth, db } from '../services/firebase'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'

export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepIndicator,
  },
  data() {
    return {
      currentStep: 0,
      title: '',
      content: '',
      bannerFile: null,
      thumbnailFile: null,
      authorName: 'Anónimo',
      loading: false,
      category: '',
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
        category: this.category,
        bannerFile: this.bannerFile,
        thumbnailFile: this.thumbnailFile,
        authorName: this.authorName,
        onTitleChange: (value) => (this.title = value),
        onContentChange: (value) => (this.content = value),
        onCategoryChange: (value) => (this.category = value),
        onBannerChange: (file) => (this.bannerFile = file),
        onThumbnailChange: (file) => (this.thumbnailFile = file),
        onPublish: this.publishPost,
      }
    },
  },
  methods: {
    async publishPost() {
      if (!this.category || !this.title || !this.content) {
        alert('Por favor, completa la primera sección antes de publicar.')
        return
      }

      if (!this.thumbnailFile || !this.bannerFile) {
        alert('Por favor, completa la segunda sección antes de publicar.')
        return
      }

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
          category: this.category,
          userId: auth.currentUser?.uid || null,
          createdAt: new Date(),
        })

        alert('¡Entrada creada exitosamente!')
        this.$router.push('/')
      } catch (error) {
        console.error('Error al publicar entrada:', error)
        alert('Error al publicar. Intenta nuevamente.')
      } finally {
        this.loading = false
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
  },
}
</script>

<style scoped>
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
  z-index: 1;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #545454;
  border-top: 5px solid #242424;
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
