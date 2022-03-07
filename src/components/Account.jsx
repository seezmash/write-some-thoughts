import { useState, useEffect } from 'react'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Alert from '@material-ui/lab/Alert'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { logout } from '../functions/auth'
import { db } from '../firebase'
//Styles
import { alertStyle, gridStyle, accountDetailsStyles } from '../mui/styles'

const DashboardComponent = () => {
  const [error, setError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setError('')
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      setError(error.code)
    }
  }

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      db.collection('users')
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          let docData = doc.data()
          if (docData && docData.firstName) {
            setFirstName(docData.firstName)
          }
          if (docData && docData.lastName) {
            setLastName(docData.lastName)
          }
        })
    }
  }, [])

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
