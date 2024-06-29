import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { DialogTitle } from '@material-ui/core'

const AddEditExamPaper = ({ open, onClose, file, setFile }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Exam Paper</DialogTitle>
      <DialogContent>
        
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          component='label'
          startIcon={<FileUploadIcon />}
          onClick={() => {
            document.getElementById('file').click()
          }}
        >
          Upload File
          <input
            type='file'
            id='file'
            hidden
            onChange={e => {
              setFile(e.target.files[0])
            }}
            value={file}
          />
        </Button>
        <Button component='label' color='error' variant='outlined'>
          Cancel
        </Button>
        <Button variant='contained' component='label'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddEditExamPaper
