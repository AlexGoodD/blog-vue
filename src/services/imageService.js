import axios from 'axios'

const IMGBB_API_KEY = 'be10365c6256d231b847a90787b0ee5a'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    await delay(5000)
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
    )

    return response.data.data.url
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.warn('Demasiadas solicitudes. Reintenta más tarde.')
    }
    throw error
  }
}
