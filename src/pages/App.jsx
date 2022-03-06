import Nav from '../components/Nav'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Account from '../components/Account'

import Dashboard from '../components/Dashboard'
import { AuthProvider } from '../context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
