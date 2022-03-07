import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Alert from '@material-ui/lab/Alert'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
// Styles
import {
  paperStyle,
  buttonStyle,
  linkStyle,
  linkStyle2,
  alertStyle
} from '../mui/styles'

const LoginComponent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let loginForm = document.getElementById('login_form')
    try {
      setError('')
      setLoading(true)
      await login(loginForm.email.value, loginForm.password.value)
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(error.code)
    }
  }

  return (
    <Grid>
      <Paper elevation={1} style={paperStyle}>
        <h2>Login</h2>
        {error && (
          <Alert severity="error" style={alertStyle}>
            {error}
          </Alert>
        )}
        <form id="login_form" onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            placeholder="Enter email"
            type="email"
            style={{ width: '100%' }}
            required
          ></TextField>
          <TextField
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            style={{ width: '100%' }}
            required
          ></TextField>
          <Button
            disabled={loading}
            type="submit"
            color="primary"
            style={buttonStyle}
            variant="contained"
          >
            Log in
          </Button>
        </form>
        <Typography style={linkStyle}>
          <Link to="/forgot-password">Forgot your password?</Link>
        </Typography>
        <Typography style={linkStyle2}>
          <span>Need an account? </span>
          <Link to="/signup">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default LoginComponent
