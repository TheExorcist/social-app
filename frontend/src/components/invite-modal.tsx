import * as React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Modal, Box, Fab } from '@mui/material'

import InviteForm from './invite-form'


export default function InviteModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Box sx={{ '& > :not(style)': { m: 1 },
        position: 'fixed',
        right: '5%',
        bottom: '10%'
      }}>
      <Fab onClick={handleOpen} color="primary" aria-label="add">
        <AddIcon/>
      </Fab>
    </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><>
        <InviteForm />
      </>
      </Modal>
    </div>
  )
}
