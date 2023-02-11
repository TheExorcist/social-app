import React, { useCallback, useEffect, useState } from 'react'
import { userInvitesApi } from '../configs/api-endpoints'


import { createInviteType, Invite, InviteResponse, Invites } from '../types/InvteType'
import { useAuth } from './use-auth'
import { useFetch } from './use-fetch'

export const useInvite = () => {
  
  const { isAuthenticatedUser } = useAuth()
  const {isFetching, isFinished, isSuccess, errors, response, statusCode, fetchGet, fetchPost} = useFetch<InviteResponse>()

  const [invite, setInvite] = useState<Invite | null>(null)
  const [invites, setInvites] = useState<Invites>([])

  const createInvite = useCallback((createInviteParams: createInviteType) => {
    if (!isFetching && isAuthenticatedUser) {
      fetchPost({
        apiUrl: userInvitesApi,
        isAuthorized: true,
        payload: {
          invite: createInviteParams
        }
      })
      // Refetch invites
    }
  }, [isFetching, isAuthenticatedUser])


  useEffect(() => {
    if (!response) return

    if (response.invites) {
      setInvites(response.invites)
    } else if((response as any).invite) {
      setInvite((response as any).invite)
    }
  }, [response])

  const fetchInvites = useCallback(() => {
    if (!isFetching && isAuthenticatedUser) {
      fetchGet({
        apiUrl: userInvitesApi,
        isAuthorized: true
      })
    }
  }, [isFetching, isAuthenticatedUser])


  return {
    isFetching,
    invites,
    isSuccess,
    errors,
    isFinished,
    statusCode,
    invite,
    fetchInvites,
    createInvite,
    setInvite,
    setInvites
  }
}
