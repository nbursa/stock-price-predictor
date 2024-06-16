import { ref, provide, inject, Ref } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'light')

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
  localStorage.setItem('theme', theme.value)
  document.documentElement.className = theme.value
}

export const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    document.documentElement.className = savedTheme
    theme.value = savedTheme
  }
}
