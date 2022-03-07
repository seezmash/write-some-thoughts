import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [thoughts, setThoughts] = useState()

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })
  }, [])

  const value = { currentUser, thoughts, setThoughts }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
