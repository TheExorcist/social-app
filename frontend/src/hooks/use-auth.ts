import React, { useCallback, useEffect } from 'react'

import useLocalStorage from "use-local-storage";
import { User } from '../types/user-type';

export const useAuth = (authUser?: User) => {
  const [user, setUser] = useLocalStorage<User | null>('authenticated-user', null)
  const [authToken, setAuthToken] = useLocalStorage<string | null>('auth-token', null)

  useEffect(() => {
    setAuthToken(user?.authToken)
  }, [user])

  const isAuthenticatedUser = !!authToken

  const logout = useCallback(() => {
    setUser(null)
  }, [setUser])

  return {
    user,
    authToken,
    setUser,
    setAuthToken,
    isAuthenticatedUser,
    logout
  }
}