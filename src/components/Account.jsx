import { useState } from 'react'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Alert from '@material-ui/lab/Alert'
import { gridStyle } from '../mui/homeStyles'
import { useAuth } from '../context/AuthContext'
import { linkStyle, alertStyle } from '../mui/formStyles'
import { Link, useNavigate } from 'react-router-dom'

const DashboardComponent = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const tempThoughts = [
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
    'Lacus vestibulum sed arcu non odio euismod lacinia. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Semper auctor neque vitae tempus quam. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Cursus turpis massa tincidunt dui ut ornare. Laoreet id donec ultrices tincidunt arcu non.',
    'Felis eget nunc lobortis mattis aliquam faucibus purus in. Nulla facilisi nullam vehicula ipsum a arcu cursus.'
  ]

  const handleLogout = async () => {
    setError('')
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      setError(error.code)
    }
  }

  const goToHomePage = () => {
    navigate('/')
  }

  const accountDetailsStyles = {
    width: '100%',
    maxWidth: '700px',
    minHeight: '80px',
    margin: '20px 0',
    padding: '20px'
  }

  return (
    <Grid style={gridStyle}>
      <Typography variant="h6">Your account details 🧝</Typography>
      <Paper elevation={1} style={accountDetailsStyles}>
        {error && (
          <Alert severity="error" style={alertStyle}>
            {error}
          </Alert>
        )}
        <Typography>
          <strong>First name: </strong>
          <span>{currentUser && currentUser.email}</span>
        </Typography>
        <Typography>
          <strong>Last name: </strong>
          <span>{currentUser && currentUser.email}</span>
        </Typography>
        <Typography>
          <strong>Email: </strong>
          <span>{currentUser && currentUser.email}</span>
        </Typography>
        <br />
      </Paper>
      {/* <Typography style={linkStyle}>
        You can update your profile <Link to="/login">over here</Link>
      </Typography> */}
      <div className="homepage_divider"></div>

      <Box display="flex" style={{ marginTop: '40px' }}>
        <Button
          onClick={goToHomePage}
          style={{ marginRight: '10px' }}
          variant="contained"
          color="primary"
        >
          Go to home
        </Button>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Log me out
        </Button>
      </Box>
    </Grid>
  )
}

export default DashboardComponent
