import React, { useState, useCallback, useEffect } from 'react'
import { TextField, FormControl, FormHelperText, Button, Snackbar, Alert } from "@mui/material"

import { useFetch, ApiRequestParams } from '../hooks/use-fetch'
import { userSignupApi } from '../configs/api-endpoints'

import { useAuth } from '../hooks/use-auth'
import { User } from '../types/user-type'
import { Navigate } from 'react-router'
import { Invite } from '../types/InvteType'


interface SignupFormProps {
  invite?: Invite | null
}

const SignupForm = ({ invite }: SignupFormProps) => {
  const {setUser, isAuthenticatedUser, user} = useAuth()
  const [email, setEmail] = useState(null || invite?.email)
  const [password, setPassword] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [passwordConfirmation, setPasswordConfirmation] = useState(null)

  const { isFetching, isSuccess, errors, response, fetchPost } = useFetch<{user: User}>()

  const submitForm = useCallback((event: any) => {
    const useEmail = email || invite?.email
    if (useEmail && password && firstName && lastName && passwordConfirmation) {

      const params: ApiRequestParams = {
        apiUrl: userSignupApi,
        isAuthorized: false,
        payload: {
          user: {
            email: useEmail,
            password,
            first_name: firstName,
            last_name: lastName,
            password_confirmation: passwordConfirmation,
            invitation_code: invite?.invitationCode
          }
        }
      }
      fetchPost(params)
    }
  }, [email, invite, password, passwordConfirmation, firstName, lastName])

  useEffect(() => {
    if (isSuccess && response) {
      setUser(response.user)
    }
  }, [response, isSuccess])

  useEffect(() => {
    if (invite?.email) {
      setEmail(invite.email)
    }
  }, [invite])

  if (!isAuthenticatedUser && invite?.accepted) {
    return <Navigate to='/login' state={{error: 'Invitation already accepted'}} replace={true} />
  }

  if (isAuthenticatedUser) {
    return <Navigate to='/dashboard' state={{authUser: user}} replace={true} />
  }

  return <>
    <FormControl fullWidth>
      <TextField fullWidth margin='normal' label='First name' onChange={(event: any) => setFirstName(event.target.value)} />
    </FormControl>
    <FormControl fullWidth>
      <TextField fullWidth margin='normal' label='Last name' onChange={(event: any) => setLastName(event.target.value)} />
    </FormControl>
    <FormControl fullWidth>
      {
        invite ? <TextField fullWidth disabled value={invite?.email} margin='normal' onChange={(event: any) => setEmail(event.target.value)} id="login-email" aria-describedby="login-email-form-helper" /> :
          <TextField fullWidth autoFocus margin='normal' label='Email' onChange={(event: any) => setEmail(event.target.value)} id="login-email" required aria-describedby="login-email-form-helper" />
      }
      <FormHelperText id="login-email-form-helper">We'll never share your email.</FormHelperText>
    </FormControl>
    <FormControl fullWidth>
      <TextField label='Password' margin='normal' fullWidth onChange={(event: any) => setPassword(event.target.value)} type="password" required id="login-user-password" aria-describedby="login-user-password-form-helper" />
      <FormHelperText id="login-user-password-form-helper"> Your password is secure </FormHelperText>
    </FormControl>
    <FormControl fullWidth>
      <TextField label='Confirm Password' margin='normal' fullWidth onChange={(event: any) => setPasswordConfirmation(event.target.value)} type="password" required id="login-user-password-confirmation" aria-describedby="login-user-password-confirmation-form-helper" />
      <FormHelperText id="login-user-password-confirmation-form-helper"> Your password is secure </FormHelperText>
    </FormControl>
    <Button onClick={submitForm}
      sx={{ mt: 3, mb: 2 }}
      variant="contained"
      fullWidth
      disabled={!email || !passwordConfirmation || !firstName || !lastName || !password || isFetching }
    >
      Signup
    </Button>
    {
      errors && <Snackbar open={true} sx={{
      position: 'absolute',
      left: '10px'
    }}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {errors}
      </Alert>
    </Snackbar>
  }
  </>
}

export default SignupForm