<template>
  <div>
    <nav class="shadow py-2 px-4 flex items-center justify-between">
      <div class="w-full flex items-center justify-between">
        <router-link to="/" class="text-xl font-bold"
          >Stock Prediction</router-link
        >
        <button
          @click="toggleSidebar"
          class="md:hidden flex items-center justify-center rounded-full h-12 w-12 text-white"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <div class="hidden md:flex items-center gap-4">
        <ul class="flex items-center gap-4 m-0">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/predictions">Predictions</router-link>
          </li>
          <li>
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
    <transition-group
      enter-active-class="transition ease-in-out duration-300 transform"
      enter-from-class="-translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition ease-in-out duration-300 transform"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-full opacity-0"
    >
      <aside
        v-if="sidebarOpen"
        class="fixed inset-0 bg-blue-950 opacity-75 transition-opacity duration-300 z-20"
        @click="toggleSidebar"
      ></aside>
      <aside
        v-if="sidebarOpen"
        class="mobile-nav fixed inset-0 z-40 flex w-full sm:max-w-[80vw] md:hidden"
      >
        <div class="relative flex-1 flex flex-col pt-12 w-full shadow-sm">
          <div
            class="absolute top-2 right-2 p-1 flex flex-col items-center justify-center gap-4"
          >
            <button
              @click="toggleSidebar"
              class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
            >
              <svg
                class="h-6 w-6 text-white"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <ThemeToggle class="" />
          </div>
          <div
            class="flex items-start justify-center flex-1 h-0 pt-5 pb-4 text-left overflow-y-auto"
          >
            <nav
              class="mt-20 flex flex-col items-start justify-start gap-2 text-left font-extrabold text-2xl"
            >
              <router-link to="/" class="p-4" @click="toggleSidebar"
                >Home</router-link
              >
              <router-link to="/predictions" class="p-4" @click="toggleSidebar"
                >Predictions</router-link
              >
              <router-link to="/dashboard" class="p-4" @click="toggleSidebar"
                >Dashboard</router-link
              >
              <router-link to="/settings" class="p-4" @click="toggleSidebar"
                >Settings</router-link
              >
            </nav>
          </div>
        </div>
      </aside>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ThemeToggle from '../components/ThemeToggle.vue'

export default defineComponent({
  name: 'NavBar',
  components: { ThemeToggle },
  setup() {
    const sidebarOpen = ref(false)

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value
    }

    return {
      sidebarOpen,
      toggleSidebar,
    }
  },
})
</script>
