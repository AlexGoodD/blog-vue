// Importa solo los módulos necesarios
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyADJlTxeEi0ZB5NSQcACBuXtz4XUQ5mJIk',
  authDomain: 'uanlog-13975.firebaseapp.com',
  projectId: 'uanlog-13975',
  storageBucket: 'uanlog-13975.firebasestorage.app',
  messagingSenderId: '790455635294',
  appId: '1:790455635294:web:88bb3522754ed5cb3a53cf',
  measurementId: 'G-RQHPFMD1KL',
}


// Inicializa Firebase
const app = initializeApp(firebaseConfig)

// Exporta las instancias de Firebase
export const auth = getAuth(app)
export const db = getFirestore(app)
