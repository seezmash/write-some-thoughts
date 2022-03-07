import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { useAuth } from '../context/AuthContext'
import { useDb } from '../context/DbContext'
// Styles
import { paperStyle, buttonStyle, linkStyle, alertStyle } from '../mui/styles'

const SignupComponent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const { createUserDocument } = useDb()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let signupForm = document.getElementById('signup_form')
    if (signupForm.password.value !== signupForm.passwordConfirm.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(signupForm.email.value, signupForm.password.value).then(
        (cred) => {
          createUserDocument(
            cred.user.uid,
            signupForm.firstName.value,
            signupForm.lastName.value,
            signupForm.email.value
          )
        }
      )
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(error.code)
    }
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
            name="firstName"
            label="First name"
            placeholder="Enter first name"
            style={{ width: '100%' }}
            required
          ></TextField>
          <TextField
            name="lastName"
            label="Last name"
            placeholder="Enter last name"
            style={{ width: '100%' }}
            required
          ></TextField>
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
          <TextField
            name="passwordConfirm"
            label="Confirm password"
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
            Sign up
          </Button>
        </form>
        <Typography style={linkStyle}>
          <span>Have an account? </span>
          <Link to="/login">Log in here</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default SignupComponent
