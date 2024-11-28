// Importa solo los módulos necesarios
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC8N88S-w4XSrMoUrApRdsD1gKwNonbkFw',
  authDomain: 'blog-uanl.firebaseapp.com',
  projectId: 'blog-uanl',
  storageBucket: 'blog-uanl.firebasestorage.app',
  messagingSenderId: '984291119350',
  appId: '1:984291119350:web:c3a0acb18bd4e628511cd7',
  measurementId: 'G-G0VKV8ZEF8',
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)

// Exporta las instancias de Firebase
export const auth = getAuth(app)
export const db = getFirestore(app)
