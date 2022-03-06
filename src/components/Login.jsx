import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { useAuth } from '../context/AuthContext'
import Alert from '@material-ui/lab/Alert'
import {
  paperStyle,
  buttonStyle,
  linkStyle,
  linkStyle2,
  alertStyle
} from '../mui/formStyles'

const LoginComponent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let loginForm = document.getElementById('login_form')

    try {
      setError('')
      setLoading(true)
      await login(loginForm.email.value, loginForm.password.value)
      navigate('/')
    } catch (error) {
      setError(error.code)
    }
    setLoading(false)
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
          {/* <TextField
            name="username"
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
          ></TextField> */}
          <TextField
            name="email"
            label="Email"
            placeholder="Enter email"
            type="email"
            fullWidth
            required
          ></TextField>
          <TextField
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
          ></TextField>
          <Button
            disabled={loading}
            type="submit"
            color="primary"
            style={buttonStyle}
            variant="contained"
            fullWidth
          >
            Log in
          </Button>
        </form>
        <Typography style={linkStyle}>
          <Link to="/passwordreset">Forgot your password?</Link>
        </Typography>
        <Typography style={linkStyle2}>
          Need an account?
          <Link to="/signup"> Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default LoginComponent
