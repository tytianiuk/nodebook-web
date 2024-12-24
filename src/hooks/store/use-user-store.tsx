import { create } from 'zustand'

import { User } from '@/types/user'

export interface UserStore {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}))

export default useUserStore
