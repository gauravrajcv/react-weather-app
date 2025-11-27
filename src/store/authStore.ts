import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const API_DELAY = 600

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, API_DELAY))
        set({
          user: {
            id: '1',
            email,
            name: email.split('@')[0],
          },
          isAuthenticated: true,
        })
      },
      
      signup: async (name: string, email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, API_DELAY))
        set({
          user: { id: '1', email, name },
          isAuthenticated: true,
        })
      },
      
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)
