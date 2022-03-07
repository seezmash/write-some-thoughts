import { useState, useEffect } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { logout } from '../functions/auth'

const NavComponent = () => {
  const [firstName, setFirstName] = useState('')
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const goToLogin = () => {
    console.log('go to login')
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
        })
    } else {
      setFirstName('')
    }
  }, [currentUser])

  return (
    <nav className="nav_bar">
      <Grid style={{ width: '100%' }}>
        <Box
          display="flex"
          alignItems="center"
          style={{
            maxWidth: '1000px',
            width: '100%',
            height: '100%',
            margin: '0 auto',
            paddingTop: '10px'
          }}
        >
          {/* <div className="nav_logo_button">
            <img className="nav_logo" src="/tailwind.svg" alt="logo" />
          </div> */}
          {/* <Typography noWrap style={{ width: '400px' }}>
            write some thoughts
          </Typography> */}
          {/* {firstName && (
            <Typography
              fontWeight="fontWeightMedium"
              noWrap
              style={{ padding: '8px 30px 0 0', display: 'table' }}
            >
              Welcome, <span>{firstName}</span>
            </Typography>
          )} */}
          {currentUser && (
            <Box
              display="flex"
              style={{
                width: '100%'
              }}
              justifyContent="flex-end"
            >
              <Button
                style={{ marginRight: '10px' }}
                onClick={() => {
                  navigate('/account')
                }}
                variant="outlined"
                disableElevation
                color="primary"
              >
                account
              </Button>
              <Button
                onClick={logout}
                variant="outlined"
                disableElevation
                color="secondary"
              >
                Log out
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </nav>
  )
}

export default NavComponent
