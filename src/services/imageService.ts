import axios, { AxiosError } from 'axios'

const IMGBB_API_KEY = 'be10365c6256d231b847a90787b0ee5a'

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file)

  // Delay para evitar saturación de solicitudes
  try {
    await delay(5000)
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
    )

    return response.data.data.url
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 429) {
      console.warn('Demasiadas solicitudes. Reintenta más tarde.')
    }

    // Relanzar el error para que pueda ser manejado por la llamada
    throw new Error(
      'Error al subir la imagen: ' +
        (error instanceof AxiosError ? error.message : 'Error desconocido'),
    )
  }
}
