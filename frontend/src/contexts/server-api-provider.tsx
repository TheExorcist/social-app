import React from 'react'

import ServerApiContext from './server-api-context'
import { useInvite } from '../hooks/use-invite'
import { useAuth } from '../hooks/use-auth'

const ServerApiProvider = (props: any) => {

  const { fetchInvites, setInvites, invites, isFetching, createInvite, isSuccess, errors, isFinished, statusCode } = useInvite()
  const { logout, isAuthenticatedUser } = useAuth()

  const serverApiContextData = {
    fetchInvites,
    setInvites,
    invites,
    createInvite,
    isFetching,
    isSuccess,
    errors,
    isFinished,
    statusCode,
    logout,
    isAuthenticatedUser
  }

  return <ServerApiContext.Provider value={serverApiContextData}>
      {props.children}
    </ServerApiContext.Provider>
}

export default ServerApiProvider
