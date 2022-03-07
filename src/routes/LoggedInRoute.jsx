import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth()

  if (currentUser) {
    return <Navigate to="/" replace />
  }
  return children
}

export default PrivateRoute
