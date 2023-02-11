import { useEffect } from 'react'

import { Box, Container, Avatar, Typography } from "@mui/material";
import Person from '@mui/icons-material/Person';

import SignupForm from '../components/signup-form';
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/use-fetch';
import { Invite } from '../types/InvteType';
import { userInvitesApi } from '../configs/api-endpoints';

const Signup = () => {
  const [searchParams, ] = useSearchParams()
  const { fetchGet, response: inviteResponse, isSuccess } = useFetch<{invite: Invite} | null>()

  const invitationCode = searchParams.get('invitation_code')

  useEffect(() => {
    if (invitationCode) {
      const apiUrl = `${userInvitesApi}/${invitationCode}`
      fetchGet({
        apiUrl: apiUrl,
        isAuthorized: false
      })
    }
  }, [invitationCode])

  return <Container sx={{
    width: '40%'
  }} >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '30px',
          justifyContent: 'space-between',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Person />
        </Avatar>
        <Typography component="h1" variant="h5">
          { inviteResponse?.invite ? 'Please accept invite' : 'Sign up' }
        </Typography>
        <SignupForm invite={inviteResponse?.invite} />
      </Box>
    </Container>
}

export default Signup