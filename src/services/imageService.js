import axios from 'axios'

const IMGUR_CLIENT_ID = 'TU_CLIENT_ID'

export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  const response = await axios.post('https://api.imgur.com/3/image', formData, {
    headers: {
      Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
    },
  })

  return response.data.data.link // Retorna la URL de la imagen
}
