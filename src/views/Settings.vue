<template>
  <div class="settings min-h-screen p-4">
    <header class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Settings</h1>
      <p class="text-sm">Configure application settings.</p>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-6">
      <section class="rounded-lg shadow-dark-sm dark:shadow-light-sm p-4">
        <h2 class="text-lg font-semibold mb-4">User Preferences</h2>
        <form @submit.prevent="savePreferences">
          <div class="mb-4">
            <label for="username" class="block font-semibold mb-2 text-xs"
              >Username</label
            >
            <input
              id="username"
              v-model="username"
              type="text"
              class="w-full text-sm px-4 py-2 border rounded-lg"
            />
          </div>
          <div class="mb-8">
            <label for="theme" class="block font-semibold mb-2 text-xs"
              >Theme</label
            >
            <select
              id="theme"
              v-model="selectedTheme"
              class="w-full px-4 py-2 text-sm border rounded-lg"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button type="submit" class="px-4 py-1 w-full">
            Save Preferences
          </button>
        </form>
      </section>
      <section class="rounded-lg p-4 shadow-dark-sm dark:shadow-light-sm h-fit">
        <h2 class="text-lg font-semibold mb-4">Notification Settings</h2>
        <form @submit.prevent="saveNotifications">
          <div class="mb-8">
            <label class="block font-semibold mb-2">Email Notifications</label>
            <div class="flex items-center justify-end">
              <SwitchCheckbox
                v-model="emailNotifications"
                label="Enable email notifications"
              />
            </div>
          </div>
          <button type="submit" class="w-full px-4 py-1">
            Save Notifications
          </button>
        </form>
      </section>
      <section class="rounded-lg p-4 shadow-dark-sm dark:shadow-light-sm">
        <h2 class="text-lg font-semibold mb-4">API Key Management</h2>
        <form @submit.prevent="saveApiKey">
          <div class="mb-4">
            <label for="api-key" class="block font-semibold mb-2 text-xs"
              >API Key</label
            >
            <input
              id="api-key"
              v-model="apiKey"
              type="text"
              class="w-full px-4 py-2 text-sm border rounded-lg"
            />
          </div>
          <button type="submit" class="w-full px-4 py-1">Save API Key</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useTheme, toggleTheme } from '../services/themeManager'
import SwitchCheckbox from '@/components/SwitchCheckbox.vue'

export default defineComponent({
  name: 'SettingsPage',
  components: { SwitchCheckbox },
  setup() {
    const theme = useTheme()
    const selectedTheme = ref(theme.value)

    const user = computed(() => {
      return JSON.parse(
        localStorage.getItem('user') ||
          JSON.stringify({
            username: '',
            theme: theme.value,
            notifications: false,
            apiKey: '',
          }),
      )
    })

    const username = ref(user.value.username)
    const emailNotifications = ref(user.value.notifications)
    const apiKey = ref(user.value.apiKey)

    const savePreferences = () => {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const updatedUser = {
        ...currentUser,
        username: username.value,
        theme: selectedTheme.value,
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      if (selectedTheme.value !== theme.value) {
        toggleTheme()
      }
    }

    const saveNotifications = () => {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const updatedUser = {
        ...currentUser,
        emailNotifications: emailNotifications.value,
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    const saveApiKey = () => {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const updatedUser = { ...currentUser, apiKey: apiKey.value }
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    return {
      username,
      selectedTheme,
      emailNotifications,
      apiKey,
      savePreferences,
      saveNotifications,
      saveApiKey,
      user,
    }
  },
})
</script>
