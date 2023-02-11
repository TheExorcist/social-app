import React, { createContext } from 'react'
import { Invites, createInviteType} from '../types/InvteType'

interface ServerApiContextType {
  invites: Invites
  fetchInvites: () => void
  createInvite: (createInviteParams: createInviteType) => void,
  isFetching: boolean
  isSuccess: boolean
  errors: string | null
  isFinished: boolean
  statusCode: number
  setInvites: (invites: Invites) => void
  logout: () => void
  isAuthenticatedUser: boolean
}

const defaultInvite = {
  email: '',
  accepted: false,
  deleted: false,
  invitedAt: ''
}

const ServerApiContext: React.Context<ServerApiContextType> = createContext<ServerApiContextType>({
  invites: [],
  fetchInvites: () => [],
  createInvite: (createInviteParams: createInviteType) => defaultInvite,
  isSuccess: true,
  isFetching: false,
  isFinished: true,
  errors: null,
  statusCode: 200,
  setInvites: (invites: Invites) => {},
  logout: () => {},
  isAuthenticatedUser: false
})

export default ServerApiContext