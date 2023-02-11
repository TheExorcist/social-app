import React, { useCallback, useContext, useEffect, useState } from 'react'
import ServerApiContext from '../contexts/server-api-context'

import { useAuth } from './use-auth'

export interface ApiRequestParams {
  apiUrl: string
  isAuthorized: boolean,
  payload?: any,
  queryParams?: any
}

const camelize = require('camelize')

export const useFetch = <T>() => {
  const { authToken } = useAuth()
  const { logout } = useContext(ServerApiContext)
  const [isFetching, setFetching] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [isFinished, setFinished] = useState(false)
  const [errors, setErrors] = useState(null)
  const [response, setResponse] = useState<T | null>(null)
  const [statusCode, setStatusCode] = useState<number>(200)

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  const authenticatedHeaders = {
    ...headers,
    Authorization: authToken
  }

  useEffect(() => {
    if (statusCode == 401) {
      logout()
    }
  }, [statusCode])

  const resetStates = useCallback(() => {
    setStatusCode(200)
    setSuccess(false)
    setFetching(true)
    setFinished(false)

    setErrors(null)
  }, [setSuccess, setFetching, setFinished])

  const fetchPost = useCallback(async (apiParms: ApiRequestParams) => {
    try {
      resetStates()
      const encodedApiUri = encodeURI(apiParms.apiUrl)
      const response = await fetch(encodedApiUri, {
        headers: apiParms.isAuthorized ? authenticatedHeaders : headers,
        credentials: 'omit',
        method: 'POST',
        body: JSON.stringify(apiParms.payload)
      })
      setStatusCode(response.status)
      const jsonRsponse = await response.json()

      if (response.status >= 400) {
        setSuccess(false)
        setErrors(jsonRsponse.message || jsonRsponse.error)
      } else {
        setSuccess(true)
      }
      setResponse(camelize(jsonRsponse))
    } catch (exception: any) {
      setErrors(exception.message)
    } finally {
      setFetching(false)
      setFinished(true)
    }
  }, [resetStates, setErrors, setFetching, setFinished])

  const fetchGet = useCallback(async (apiParms: ApiRequestParams) => {
    try {
      resetStates()
      const encodedApiUri = encodeURI(apiParms.apiUrl)
      const response = await fetch(encodedApiUri, {
        headers: apiParms.isAuthorized ? authenticatedHeaders : headers,
        credentials: 'omit'
      })
      setStatusCode(response.status)
      const jsonRsponse = await response.json()
      setResponse(camelize(jsonRsponse))
      setSuccess(true)
    } catch (exception: any) {
      setErrors(exception.message)
    } finally {
      setFetching(false)
      setFinished(true)
    }
  }, [resetStates, setErrors, setFetching, setFinished])

  return {
    isFetching,
    isSuccess,
    errors,
    isFinished,
    response,
    statusCode,
    fetchGet,
    fetchPost
  }
}
