<template>
  <div class="image-upload">
    <h1>Sube imágenes para usar como banner y miniatura</h1>
    <div class="upload-section">
      <div class="upload-button banner" @click="triggerBannerUpload">
        <span class="material-symbols-outlined icon">upload</span>
        <p>Sube una imagen de por lo menos 1285 x 380 píxeles</p>
        <input id="banner" type="file" @change="onBannerUpload" ref="bannerInput" />
        <p v-if="bannerFileName" class="file-name">{{ bannerFileName }}</p>
      </div>

      <div class="upload-button thumbnail" @click="triggerThumbnailUpload">
        <span class="material-symbols-outlined icon">upload</span>
        <p>Sube una imagen de por lo menos 400 x 460 píxeles</p>
        <input id="thumbnail" type="file" @change="onThumbnailUpload" ref="thumbnailInput" />
        <p v-if="thumbnailFileName" class="file-name">{{ thumbnailFileName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['onBannerChange', 'onThumbnailChange', 'bannerFile', 'thumbnailFile'],
  computed: {
    bannerFileName() {
      return this.bannerFile?.name || ''
    },
    thumbnailFileName() {
      return this.thumbnailFile?.name || ''
    },
  },
  methods: {
    async onBannerUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const dimensions = await this.getImageDimensions(file)
        if (dimensions.width >= 1285 && dimensions.height >= 380) {
          this.onBannerChange(file)
        } else {
          alert('La imagen para el banner debe tener al menos 1285 x 380 píxeles.')
        }
      }
    },
    async onThumbnailUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const dimensions = await this.getImageDimensions(file)
        if (dimensions.width >= 400 && dimensions.height >= 460) {
          this.onThumbnailChange(file)
        } else {
          alert('La miniatura debe tener al menos 400 x 460 píxeles.')
        }
      }
    },
    triggerBannerUpload() {
      this.$refs.bannerInput.click()
    },
    triggerThumbnailUpload() {
      this.$refs.thumbnailInput.click()
    },
    getImageDimensions(file) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        const objectUrl = URL.createObjectURL(file)
        img.onload = () => {
          resolve({ width: img.width, height: img.height })
          URL.revokeObjectURL(objectUrl)
        }
        img.onerror = reject
        img.src = objectUrl
      })
    },
  },
}
</script>

<style scoped>
.image-upload {
  padding-right: 50px;
  padding-left: 50px;
}

h1 {
  color: white;
  text-align: center;
}

.upload-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
}

/* Botón general */
.upload-button {
  background-color: #353535;
  color: #a3a3a3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
}

.upload-button:hover {
  background-color: #636363;
  color: #353535;
}

.upload-button .icon {
  font-size: 100px;
  color: #a3a3a3;
  margin-bottom: 10px;
}

.upload-button p {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.file-name {
  margin-top: 5px;
  font-size: 10px;
  color: #a3a3a3;
  word-break: break-word;
  text-align: center;
  font-style: italic;
  text-decoration: underline;
}

.upload-button.banner {
  width: 100%;
  margin-bottom: 20px;
  height: 200px;
}

.upload-button.thumbnail {
  width: 210px;
  height: 240px;
}

input[type='file'] {
  display: none;
}
</style>
