import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'

const NavComponent = () => {
  const goToLogin = () => {
    console.log('go to login')
  }
  return (
    <nav className="nav_bar">
      {/* ====================================================================== */}
      <Grid fullWidth style={{ display: 'none' }}>
        <Box
          display="flex"
          alignItems="center"
          style={{
            maxWidth: '900px',
            width: '100%',
            height: '100%',
            margin: '0 auto',
            paddingTop: '10px'
          }}
        >
          {/* <div className="nav_logo_button">
            <img className="nav_logo" src="/tailwind.svg" alt="logo" />
          </div> */}
          <Box
            display="flex"
            style={{
              width: '100%'
            }}
            justifyContent="flex-end"
          >
            <Button
              style={{ marginRight: '10px' }}
              onClick={goToLogin}
              variant="contained"
              disableElevation
              color="primary"
            >
              <span>Sign up</span>
            </Button>
            <Button
              onClick={goToLogin}
              variant="contained"
              disableElevation
              color="primary"
            >
              <span>Log in</span>
            </Button>
          </Box>
        </Box>
      </Grid>
    </nav>
  )
}

export default NavComponent
