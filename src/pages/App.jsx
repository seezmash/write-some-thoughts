import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { DbProvider } from '../context/DbContext'
import Nav from '../components/Nav'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Account from '../components/Account'
import Forgot from '../components/Forgot'
import Home from '../components/Home'
import PrivateRoute from '../routes/PrivateRoute'
import LoggedInRoute from '../routes/LoggedInRoute'

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <DbProvider>
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
              <Route
                path="/login"
                element={
                  <LoggedInRoute>
                    <Login />
                  </LoggedInRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <PrivateRoute>
                    <Account />
                  </PrivateRoute>
                }
              />
              <Route path="/forgot-password" element={<Forgot />} />
            </Routes>
          </DbProvider>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
