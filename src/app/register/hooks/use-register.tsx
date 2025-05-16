import { useMutation } from '@tanstack/react-query'
import { RegisterRequest } from '@/app/types/register-form'

export default function useRegister() {
  const api = '/api/auth/signup'
  const checkApi = '/api/auth/check'

  const signupRequest = async (data: RegisterRequest) => {
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(
          errorMessage.message || 'An error occurred while signing up',
        )
      }

      return response.json()
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }

  const signup = useMutation({
    mutationFn: signupRequest,
    mutationKey: ['signup'],
  })

  const checkRequest = async (query: string) => {
    try {
      const response = await fetch(`${checkApi}?${query}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(
          errorMessage.message ||
            'An error occurred while checking availability',
        )
      }

      return response.json()
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('An unknown error occurred')
    }
  }

  const check = useMutation({
    mutationFn: checkRequest,
    mutationKey: ['check'],
  })

  return { signup, check }
}
