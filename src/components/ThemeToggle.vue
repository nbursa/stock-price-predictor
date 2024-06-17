<template>
  <div>
    <button
      @click="toggleTheme"
      class="h-10 w-10 md:w-8 md:h-8 flex items-center justify-center"
    >
      <i :class="iconClass"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useTheme, toggleTheme } from '../services/themeManager.ts'

export default defineComponent({
  name: 'ThemeToggle',
  setup() {
    const theme = useTheme()

    const iconClass = computed(() => {
      return theme.value === 'dark' ? 'fas fa-moon' : 'fas fa-sun'
    })

    return {
      toggleTheme,
      iconClass,
      theme,
    }
  },
})
</script>
