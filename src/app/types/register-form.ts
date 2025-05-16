type RegisterForm = {
  username: string
  password: string
  confirmPassword: string
  sex: string
  email: string
  verifyCode: string
}

type RegisterRequest = {
  username: string
  password: string
  sex: string
  email: string
}

export type { RegisterForm, RegisterRequest }
