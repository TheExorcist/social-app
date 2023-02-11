interface User {
  email: string
  firstName: string
  lastName: string
}

interface UserCredential {
  password: string
  passwordConfirmation: string
}

type LoginFormData = Omit<User, 'firstName' | 'lastName'> & Omit<UserCredential, 'passwordConfirmation'>

export interface LoginFormType {
  onClick: (formData: LoginFormData) => void
  isLoading: boolean
}
