<template>
  <div class="settings min-h-screen p-4">
    <header class="mb-6">
      <h1 class="text-4xl font-bold mb-2">Settings</h1>
      <p class="text-lg">Configure application settings.</p>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-6">
      <section class="rounded-lg shadow-dark-sm dark:shadow-light-sm p-6">
        <h2 class="text-2xl font-semibold mb-4">User Preferences</h2>
        <form @submit.prevent="savePreferences">
          <div class="mb-4">
            <label for="username" class="block font-semibold mb-2"
              >Username</label
            >
            <input
              id="username"
              v-model="username"
              type="text"
              class="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div class="mb-4">
            <label for="theme" class="block font-semibold mb-2">Theme</label>
            <select
              id="theme"
              v-model="selectedTheme"
              class="w-full px-4 py-2 border rounded-lg"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button type="submit" class="w-full px-4 py-2">
            Save Preferences
          </button>
        </form>
      </section>
      <section class="rounded-lg p-6 shadow-dark-sm dark:shadow-light-sm h-fit">
        <h2 class="text-2xl font-semibold mb-4">Notification Settings</h2>
        <form @submit.prevent="saveNotifications">
          <div class="mb-4">
            <label class="block font-semibold mb-2">Email Notifications</label>
            <div class="flex items-center">
              <input
                id="email-notifications"
                v-model="emailNotifications"
                type="checkbox"
                class="mr-2"
              />
              <label for="email-notifications" class=""
                >Enable email notifications</label
              >
            </div>
          </div>
          <button type="submit" class="w-full px-4 py-2">
            Save Notifications
          </button>
        </form>
      </section>
      <section class="rounded-lg p-6 shadow-dark-sm dark:shadow-light-sm">
        <h2 class="text-2xl font-semibold mb-4">API Key Management</h2>
        <form @submit.prevent="saveApiKey">
          <div class="mb-4">
            <label for="api-key" class="block font-semibold mb-2"
              >API Key</label
            >
            <input
              id="api-key"
              v-model="apiKey"
              type="text"
              class="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button type="submit" class="w-full px-4 py-2">Save API Key</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { toggleTheme, useTheme } from '../services/themeManager.ts'

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const username = ref('')
    const theme = useTheme()
    const selectedTheme = ref(theme.value)
    const emailNotifications = ref(false)
    const apiKey = ref('')

    const savePreferences = () => {
      console.log('Preferences saved:', {
        username: username.value,
        theme: selectedTheme.value,
      })
      if (theme.value !== selectedTheme.value) {
        toggleTheme()
      }
    }

    const saveNotifications = () => {
      console.log('Notifications saved:', {
        emailNotifications: emailNotifications.value,
      })
    }

    const saveApiKey = () => {
      console.log('API key saved:', { apiKey: apiKey.value })
    }

    return {
      username,
      selectedTheme,
      emailNotifications,
      apiKey,
      savePreferences,
      saveNotifications,
      saveApiKey,
    }
  },
})
</script>
