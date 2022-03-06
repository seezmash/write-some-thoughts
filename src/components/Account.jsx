import { useState } from 'react'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { noteInputStyle, gridStyle, thoughtItemStyle } from '../mui/homeStyles'

const DashboardComponent = () => {
  const [error, setError] = useState('')

  const tempThoughts = [
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
    'Lacus vestibulum sed arcu non odio euismod lacinia. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Semper auctor neque vitae tempus quam. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Cursus turpis massa tincidunt dui ut ornare. Laoreet id donec ultrices tincidunt arcu non.',
    'Felis eget nunc lobortis mattis aliquam faucibus purus in. Nulla facilisi nullam vehicula ipsum a arcu cursus.'
  ]

  const handleLogout = () => {
    console.log('log out')
  }

  const accountDetailsStyles = {
    width: '100%',
    maxWidth: '700px',
    minHeight: '80px',
    margin: '20px 0',
    padding: '10px'
  }

  return (
    <Grid style={gridStyle}>
      <Box display="flex" justifyContent="flex-end" style={{ width: '100%' }}>
        <Button onClick={handleLogout} variant="contained" color="primary">
          Log me out
        </Button>
      </Box>
      <Typography variant="h6">Your account details 🧝</Typography>
      <Paper
        elevation={1}
        style={accountDetailsStyles}
        variant="outlinedf"
      ></Paper>
      <div className="homepage_divider"></div>
    </Grid>
  )
}

export default DashboardComponent
