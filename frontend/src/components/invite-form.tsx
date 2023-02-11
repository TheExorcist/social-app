import React, { useState, useCallback, useContext, useEffect } from 'react'
import { TextField, FormControl, FormHelperText, Button, Box, Typography } from "@mui/material"

import { Snackbar, Alert } from '@mui/material'

import { InviteFormType } from '../types/InvteType'
import ServerApiContext from '../contexts/server-api-context'
import { useInvite } from '../hooks/use-invite'

const InviteForm = () => {
  const [email, setEmail] = useState(null)

  const {setInvites, invites} = useContext(ServerApiContext)
  const {isFetching, isSuccess, createInvite, errors, invite } = useInvite() 

  const submitForm = useCallback(async (event: any) => {
    if (email) {
      await createInvite({
        email
      } as InviteFormType)
    }
  }, [email])

  useEffect(() => {
    if (isSuccess && !errors && invite) {
      setInvites([invite, ...invites])
    }
  }, [isSuccess, errors, invite])

  return <><Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '400px',
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '0.5px solid #CFCFCF',
        boxShadow: 24,
      }}
    >
    <FormControl
      sx={{
        width: '70%',
        marginLeft: '15px',
        marginRight: '30px',
        marginTop: '20px',
        marginBottom: '30px'
      }}
    >
      <Typography>
          Invite User
      </Typography>
      <TextField autoFocus margin='normal' label='Email' onChange={(event: any) => setEmail(event.target.value)} id="login-email" required aria-describedby="login-email-form-helper" />
      <FormHelperText id="login-email-form-helper">Invite user with above email</FormHelperText>
      
    </FormControl>
    <Button onClick={submitForm}
      sx={{ mt: 9, mb: 8, }}
      type='button'
      variant="contained"
      disabled={!email || isFetching }
    >
      Add
    </Button>
  </Box>
  { errors && <Snackbar open={true} sx={{
    position: 'absolute',
    left: '10px'
  }}>
    <Alert severity="error" sx={{ width: '100%' }}>
      {errors}
    </Alert>
  </Snackbar>}
  {
    isSuccess && invite && <Snackbar open={true} sx={{
      position: 'absolute',
      left: '10px'
    }}>
      <Alert severity="success" sx={{ width: '100%' }}>
        {`${invite.email} is invited`}
      </Alert>
    </Snackbar>
  }
  </>
}


export default InviteForm
