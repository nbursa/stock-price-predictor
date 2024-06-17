import { ref, provide, inject, Ref } from 'vue'

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : { theme: 'light' }
}

const saveUserToLocalStorage = (user: { theme: string }) => {
  localStorage.setItem('user', JSON.stringify(user))
}

const user = getUserFromLocalStorage()
const theme = ref(user.theme)

export const provideTheme = () => {
  provide('theme', theme)
}

export const useTheme = () => {
  const providedTheme = inject<Ref<string>>('theme')
  if (!providedTheme) throw new Error('No theme provided')
  return providedTheme
}

export const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  const user = getUserFromLocalStorage()
  user.theme = theme.value
  saveUserToLocalStorage(user)
  document.documentElement.className = theme.value
}

export const loadTheme = () => {
  const savedUser = getUserFromLocalStorage()
  if (savedUser) {
    document.documentElement.className = savedUser.theme
    theme.value = savedUser.theme
  }
}
