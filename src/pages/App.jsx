import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Nav from '../components/Nav'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Account from '../components/Account'
import Forgot from '../components/Forgot'
import Home from '../components/Home'
import PrivateRoute from '../components/PrivateRoute'

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/forgot-password" element={<Forgot />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
