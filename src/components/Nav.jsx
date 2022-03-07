import { Grid, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const NavComponent = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

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
