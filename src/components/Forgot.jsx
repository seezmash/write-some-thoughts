import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { resetPassword } from '../functions/auth'
import Alert from '@material-ui/lab/Alert'
// Styles
import {
  paperStyle,
  buttonStyle,
  linkStyle,
  linkStyle2,
  alertStyle
} from '../mui/styles'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let forgotPasswordForm = document.getElementById('login_form')
    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(forgotPasswordForm.email.value)
      setMessage('Check your email for the reset link')
    } catch (error) {
      setError(error.code)
    }
    setLoading(false)
  }

  return (
    <Grid>
      <Paper elevation={1} style={paperStyle}>
        <h2>Forgot password</h2>
        {error && (
          <Alert severity="error" style={alertStyle}>
            {error}
          </Alert>
        )}
        {message && (
          <Alert severity="success" style={alertStyle}>
            {message}
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
          <Button
            disabled={loading}
            type="submit"
            color="primary"
            style={buttonStyle}
            variant="contained"
          >
            Reset password
          </Button>
        </form>
        <Typography style={linkStyle}>
          <Link to="/login">Go back to log in?</Link>
        </Typography>
        <Typography style={linkStyle2}>
          Need an account?
          <Link to="/signup"> Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default ForgotPassword
