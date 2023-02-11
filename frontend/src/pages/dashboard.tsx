import { useContext, useEffect } from 'react'
import { Grid, Typography, Container, Box, Fab } from '@mui/material'

import { Navigate, useLocation } from 'react-router-dom'
import ServerApiContext from '../contexts/server-api-context'
import { useAuth } from '../hooks/use-auth'

import InviteCard from '../components/invite-card'
import Header from '../components/header'

import InviteModal from '../components/invite-modal'

export const Dashboard = () => {
  const location = useLocation()

  const { invites, fetchInvites, isFetching, logout, isAuthenticatedUser } = useContext(ServerApiContext)

  useEffect(() => {
    if (isAuthenticatedUser && !isFetching) {
      fetchInvites()
    }
  }, [isAuthenticatedUser])

  if (!isAuthenticatedUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>
  <Header handleLogout={logout} />
  <Container sx={{
    marginTop: '2%',

  }}>
    <Typography sx={{
      textAlign: 'left',
      marginBottom: '5%'
    }} >
      { invites.length == 0 ? 'You do not have invites, please create !!': 'Here are the invites .....'} 
    </Typography>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {invites.map((invite, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <InviteCard {...invite} />
        </Grid>
      ))}
    </Grid>
    <InviteModal />
  </Container>
  </>
}