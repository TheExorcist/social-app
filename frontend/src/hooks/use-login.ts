import React, { useEffect } from 'react'
import { userSignInApi } from '../configs/api-endpoints'
import { useAuth } from './use-auth'

import { useFetch } from './use-fetch'
import { User } from '../types/user-type'


interface LogApiParams {
  email: string
  password: string
}

interface UserResponse {
  user: User
}

export const useLogin = () => {

  const {isFetching, isFinished, isSuccess, errors, response, fetchPost} = useFetch<UserResponse>()
  const {setUser, isAuthenticatedUser} = useAuth()

  const callLoginApi = (params: LogApiParams) => {
    fetchPost({
      apiUrl: userSignInApi,
      payload: { user: params },
      isAuthorized: false
    })
  }

  useEffect(() => {
    if (isSuccess && response) {
      setUser(response?.user)
    }
  }, [response, isSuccess])

  useEffect(() => {
    if (isAuthenticatedUser) {
      window.location.pathname = '/dashboard'
    }
  }, [isAuthenticatedUser])

  return {
    isFetching,
    isFinished,
    isSuccess,
    errors,
    response,
    callLoginApi
  }
}