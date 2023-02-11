import React from 'react'

import { Link, useLocation } from 'react-router-dom';

import { Box, Container, Avatar, Typography, Alert } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import LoginForm from '../components/login-form';
import { useLogin } from '../hooks/use-login';

import humanizeString from 'humanize-string';


const Login = () => {
  const { isFetching, errors, callLoginApi } = useLogin()

  const handleSubmit = (values: any) => callLoginApi(values)

  const { state: { error: stateError } } = useLocation()

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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        <LoginForm isLoading={isFetching} onClick={handleSubmit} />
        <Link to="/signup"> Don't have the account ? </Link>
      </Box>
      { (errors || stateError) && <Alert severity="error"
        sx={{
          marginTop: '20px'
        }}
      >
            <strong> {humanizeString(errors || stateError)} </strong>
          </Alert>
      }
    </Container>
}

export default Login