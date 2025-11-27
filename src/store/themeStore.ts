import { create } from 'zustand'

interface ThemeStore {
  isDark: boolean
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
}

const THEME_KEY = 'theme'

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: localStorage.getItem(THEME_KEY) === 'dark',
  
  toggleTheme: () => {
    set((state) => {
      const newValue = !state.isDark
      localStorage.setItem(THEME_KEY, newValue ? 'dark' : 'light')
      return { isDark: newValue }
    })
  },
  
  setTheme: (isDark: boolean) => {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
    set({ isDark })
  },
}))
