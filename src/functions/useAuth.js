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

const useAuth = () => {
  return { signup, login, resetPassword, logout }
}

export default useAuth
