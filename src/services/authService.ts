// Import registro/inicio/cerrar sesión
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'
// Import ediciones de datos personales
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
} from 'firebase/auth'

// Registro
export const register = async (
  email: string,
  password: string,
  additionalInfo: { firstName: string; lastName: string },
) => {
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

// Iniciar sesión
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw error
  }
}

// Cerrar sesión
export const logout = async (): Promise<string> => {
  try {
    await signOut(auth)
    return 'Sesión cerrada correctamente.'
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al cerrar sesión: ${error.message}`)
    }
    throw new Error('Error desconocido al cerrar la sesión.')
  }
}

// Actualizar nombre
export const updateName = async (
  userId: string,
  firstnewName: string,
  lastNewName: string,
): Promise<string> => {
  if (!firstnewName.trim() || !lastNewName.trim()) {
    throw new Error('El nombre no puede estar vacío.')
  }

  try {
    const userDocRef = doc(db, 'users', userId)
    await updateDoc(userDocRef, {
      firstName: firstnewName,
      lastName: lastNewName,
    })
    return 'Nombre actualizado correctamente.'
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al actualizar el nombre: ${error.message}`)
    }
    throw new Error('Error desconocido al actualizar el nombre.')
  }
}

export const changeEmail = async (
  currentEmail: string,
  currentPassword: string,
  newEmail: string,
) => {
  if (!auth.currentUser) throw new Error('Usuario no autenticado.')

  try {
    const credential = EmailAuthProvider.credential(currentEmail, currentPassword)
    await reauthenticateWithCredential(auth.currentUser, credential)
    await updateEmail(auth.currentUser, newEmail)

    const userDocRef = doc(db, 'users', auth.currentUser.uid)
    await updateDoc(userDocRef, { email: newEmail })

    return 'Correo actualizado correctamente.'
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al actualizar el correo: ${error.message}`)
    }
    throw new Error('Error desconocido al actualizar el correo.')
  }
}

// Cambiar contraseña
export const changePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
) => {
  if (!currentPassword || !newPassword) {
    throw new Error('Por favor, completa todos los campos.')
  }

  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuario no autenticado.')

    // Reautenticar al usuario
    const credential = EmailAuthProvider.credential(email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    // Actualizar contraseña
    await updatePassword(user, newPassword)
    return 'Contraseña actualizada correctamente.'
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error al contraseña la contraseña: ${error.message}`)
    }
    throw new Error('Error desconocido al cambiar la contraseña.')
  }
}
