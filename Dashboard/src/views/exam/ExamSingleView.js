import { Box, Button, Card, CardContent, CardHeader, Chip, Typography } from '@mui/material'
import { useState } from 'react'
import AddEditExamPaper from './AddEditExamPaper'

const ExamSingleView = ({ id, data }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [file, setFile] = useState(null)

  if (!data)
    return (
      <Card>
        <CardHeader title='No exam found' />
      </Card>
    )

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant='h5'>{data.name}</Typography>
          <Chip label={data.status} color={data.status === 'ONGOING' ? 'success' : 'error'} />
        </Box>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setDrawerOpen(true)
          }}
        >
          Add Exam Paper
        </Button>
      </CardContent>
      <AddEditExamPaper open={drawerOpen} onClose={() => setDrawerOpen(false)} file={file} setFile={setFile} />
    </Card>
  )
}

export default ExamSingleView
