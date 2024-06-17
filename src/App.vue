<template>
  <div class="w-full h-full flex flex-col" :class="theme">
    <NavBar />
    <main class="flex-1 mx-auto mt-4 w-full overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import { useTheme } from '@/services/themeManager.ts'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
  setup() {
    const { theme } = useTheme()
    return { theme }
  },
})
</script>
