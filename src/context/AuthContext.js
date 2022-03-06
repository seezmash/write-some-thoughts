import { dblClick } from '@testing-library/user-event/dist/click'
import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  // const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  const logout = () => {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      // setLoading(false)
    })
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
