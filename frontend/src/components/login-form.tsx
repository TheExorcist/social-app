import React, { useState, useCallback } from 'react'
import { TextField, FormControl, FormHelperText, Button } from "@mui/material"

import { LoginFormType as LoginFormProps } from '../types/LoginFormType'

const LoginForm = (formProps: LoginFormProps) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const { onClick, isLoading } = formProps

  const submitForm = useCallback((event: any) => {
    if (email && password) {
      console.log({
        email,
        password
      })
      onClick({
        email,
        password
      })
    }
  }, [email, password])

  return <>
    <FormControl fullWidth>
      <TextField autoFocus fullWidth margin='normal' label='Email' onChange={(event: any) => setEmail(event.target.value)} id="login-email" required aria-describedby="login-email-form-helper" />
      <FormHelperText id="login-email-form-helper">We'll never share your email.</FormHelperText>
    </FormControl>
    <FormControl fullWidth>

      <TextField label='Password' margin='normal' fullWidth onChange={(event: any) => setPassword(event.target.value)} type="password" required id="login-user-password" aria-describedby="login-user-password-form-helper" />
      <FormHelperText id="login-user-password-form-helper"> Your password is secure </FormHelperText>
    </FormControl>
    <Button onClick={submitForm}
      sx={{ mt: 3, mb: 2 }}
      variant="contained"
      fullWidth
      disabled={!email || !password || isLoading }
    >
      Login
    </Button>
  </>
}


export default LoginForm

