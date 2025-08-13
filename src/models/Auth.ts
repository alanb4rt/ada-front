interface Register {
  username: string
  email: string
  password: string
  confirmPassword: string
  phone: string
}

interface Login {
  login?: string
  phone?: string
  email?: string
  password: string
}

export type { Login, Register }
