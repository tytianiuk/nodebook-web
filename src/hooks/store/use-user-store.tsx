import { create } from 'zustand'

import { User } from '@/types/user'

export interface UserStore {
  user: User | null
  isLoading: boolean
  setUser: (user: User) => void
  clearUser: () => void
  setLoading: (isLoading: boolean) => void
  loadUserFromStorage: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },
  clearUser: () => {
    localStorage.removeItem('user')
    set({ user: null })
  },
  setLoading: (isLoading: boolean) => set({ isLoading }),
  loadUserFromStorage: () => {
    set({ isLoading: true })
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        set({ user: JSON.parse(storedUser) })
      }
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default useUserStore
