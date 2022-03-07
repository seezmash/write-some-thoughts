import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { addThoughtToDocument } from '../functions/firestore'
import Box from '@material-ui/core/Box'
import SaveIcon from '@material-ui/icons/Save'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
// Styles
import { noteInputStyle, gridStyle, thoughtItemStyle } from '../mui/styles'

const DashboardComponent = () => {
  const [thoughts, setThoughts] = useState([])
  const [firstName, setFirstName] = useState('')
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      let unsubThoughts = db
        .collection('thoughts')
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          let docData = doc.data()
          if (docData && docData.thoughtsArray) {
            setThoughts(docData.thoughtsArray)
          }
        })
    }
  }, [currentUser])

  const handleSubmit = (e) => {
    e.preventDefault()
    const thoughtInputForm = document.getElementById('thought_input_form')
    let newThoughts = Array.from(thoughts)
    let thoughtValue = thoughtInputForm.thought.value
    if (thoughtValue.length > 0) {
      newThoughts.unshift(thoughtValue)
      addThoughtToDocument(currentUser.uid, newThoughts)
    }
  }

  return (
    <Grid style={gridStyle}>
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
        <Box display="flex" style={{ marginTop: '40px', maxWidth: '700px' }}>
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
        {thoughts.map((item, index) => {
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
