import { useState } from 'react'
import { Link } from 'react-router-dom'
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

const SignupComponent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let signupForm = document.getElementById('signup_form')

    if (signupForm.password.value !== signupForm.passwordConfirm.value) {
      return setError('Passwords do not match.')
    }
    try {
      setError('')
      setLoading(true)
      await signup(signupForm.email.value, signupForm.password.value)
    } catch (error) {
      setError(error.code)
    }
    setLoading(false)
  }

  return (
    <Grid>
      <Paper elevation={1} style={paperStyle}>
        <h2>Sign up</h2>
        {error && (
          <Alert severity="error" style={alertStyle}>
            {error}
          </Alert>
        )}
        <form id="signup_form" onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
          ></TextField>
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
          <TextField
            name="passwordConfirm"
            label="Confirm password"
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
            Sign up
          </Button>
        </form>
        <Typography style={linkStyle}>
          Have an account?
          <Link to="/login"> Log in here</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default SignupComponent
