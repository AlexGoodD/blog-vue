import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

export const register = async (email, password, additionalInfo) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      firstName: additionalInfo.firstName,
      lastName: additionalInfo.lastName,
      createdAt: new Date(),
    })

    return user
  } catch (error) {
    throw error
  }
}

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw error
  }
}
