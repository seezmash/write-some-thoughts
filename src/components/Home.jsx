import Box from '@material-ui/core/Box'
import SaveIcon from '@material-ui/icons/Save'
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { useAuth } from '../context/AuthContext'
import { useDb } from '../context/DbContext'
// Styles
import { noteInputStyle, gridStyle, thoughtItemStyle } from '../mui/styles'

const DashboardComponent = () => {
  const { currentUser } = useAuth()
  const { thoughts, firstName, addThoughtToDocument } = useDb()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const thoughtInputForm = document.getElementById('thought_input_form')
    let newThoughts = Array.from(thoughts)
    let thoughtValue = thoughtInputForm.thought.value
    if (thoughtValue.length > 0) {
      newThoughts.unshift(thoughtValue)
      await addThoughtToDocument(currentUser.uid, newThoughts)
      thoughtInputForm.reset()
    }
  }

  return (
    <Grid style={gridStyle}>
      {
        <Box
          display="flex"
          style={{
            width: '100%'
          }}
          justifyContent="flex-end"
        >
          <Typography
            fontWeight="fontWeightMedium"
            noWrap
            style={{ display: 'table' }}
          >
            Signed in as <span>{firstName}</span>
          </Typography>
        </Box>
      }
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
        {thoughts &&
          thoughts.map((item, index) => {
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
