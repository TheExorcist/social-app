
const serviceBaseUrl = () => {
  if (process.env.NODE_ENV == 'development') return 'http://localhost:3001'

  return '/'
}

export const apiPrefix = '/api/v1'
export const userSignIn = '/users/sign_in'
export const inviteApiSuffix = '/invites'
export const userSignupSuffix = '/users'
export const userSignInApi = `${serviceBaseUrl()}${apiPrefix}${userSignIn}`
export const userInvitesApi = `${serviceBaseUrl()}${apiPrefix}${inviteApiSuffix}`
export const userSignupApi = `${serviceBaseUrl()}${apiPrefix}${userSignupSuffix}`
