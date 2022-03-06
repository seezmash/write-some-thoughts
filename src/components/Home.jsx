import { useState, useEffect } from 'react'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import {
  createUserDocument,
  addThoughtToDocument
} from '../functions/firestore'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import { noteInputStyle, gridStyle, thoughtItemStyle } from '../mui/homeStyles'

const DashboardComponent = () => {
  const [error, setError] = useState('')
  const [thoughts, setThoughts] = useState([])
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('hello')
  }, [])

  const tempThoughts = [
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu',
    'Lacus vestibulum sed arcu non odio euismod lacinia. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Semper auctor neque vitae tempus quam. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Cursus turpis massa tincidunt dui ut ornare. Laoreet id donec ultrices tincidunt arcu non.',
    'Felis eget nunc lobortis mattis aliquam faucibus purus in. Nulla facilisi nullam vehicula ipsum a arcu cursus.'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const thoughtInputForm = document.getElementById('thought_input_form')
    let newThoughts = Array.from(tempThoughts)
    newThoughts.push(thoughtInputForm.thought.value)
    addThoughtToDocument(currentUser.uid, newThoughts)
  }

  return (
    <Grid style={gridStyle}>
      <Box display="flex" justifyContent="flex-end" style={{ width: '100%' }}>
        <Button
          onClick={() => {
            navigate('/account')
          }}
          variant="contained"
          color="primary"
        >
          Go to my account
        </Button>
      </Box>
      <Typography variant="h6">Write your thoughts here! 🖊️</Typography>
      <form id="thought_input_form" onSubmit={handleSubmit}>
        <Paper elevation={1} style={noteInputStyle}>
          <TextField
            name="thought"
            fullWidth
            variant="outlined"
            multiline
          ></TextField>
        </Paper>
        <Box
          display="flex"
          style={{ marginTop: '40px', maxWidth: '700px' }}
          // justifyContent="center"
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SaveIcon />}
            color="primary"
          >
            <span style={{ marginLeft: '4px' }}>Save thought</span>
          </Button>
        </Box>
      </form>
      <div className="homepage_divider"></div>
      <Typography variant="h6" style={{ marginTop: '40px' }}>
        Saved thoughts are down here 👇
      </Typography>
      <Box display="flex" flexWrap="wrap" style={{ marginTop: '30px' }}>
        {tempThoughts.map((item, index) => {
          return (
            <Paper
              elevation={1}
              key={'noteid_' + index}
              style={thoughtItemStyle}
            >
              {item}
            </Paper>
          )
        })}
      </Box>
    </Grid>
  )
}

export default DashboardComponent
