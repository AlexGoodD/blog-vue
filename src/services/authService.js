import { auth } from './firebase'

export const login = async (email, password) => {
  await auth.signInWithEmailAndPassword(email, password)
}

export const register = async (email, password) => {
  await auth.createUserWithEmailAndPassword(email, password)
}
