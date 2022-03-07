import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Alert from '@material-ui/lab/Alert'
import { useNavigate } from 'react-router-dom'
import { useDb } from '../context/DbContext'
//Styles
import { alertStyle, gridStyle, accountDetailsStyles } from '../mui/styles'

const DashboardComponent = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const { firstName, lastName, userEmail } = useDb()

  const handleLogout = async () => {
    setError('')
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      setError(error.code)
    }
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
          <span>{firstName}</span>
        </Typography>
        <Typography>
          <strong>Last name: </strong>
          <span>{lastName}</span>
        </Typography>
        <Typography style={{ marginTop: '20px' }}>
          <strong>Email: </strong>
          <span>{userEmail}</span>
        </Typography>
        <br />
      </Paper>
      <div className="homepage_divider"></div>
      <Box display="flex" style={{ marginTop: '40px' }}>
        <Button
          onClick={() => {
            navigate('/')
          }}
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
