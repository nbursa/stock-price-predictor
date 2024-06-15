<template>
  <div class="">
    <nav class="shadow py-2 px-4 flex items-center justify-between">
      <button @click="toggleSidebar" class="md:hidden flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <h1 class="text-xl font-bold m-0 ">Stock Predictor</h1>
      <ul class="hidden md:flex items-center gap-2 m-0 ">
        <li><router-link class="text-gray-200" to="/">Home</router-link></li>
        <li><router-link class="text-gray-200" to="/predictions">Predictions</router-link></li>
        <li><router-link class="text-gray-200" to="/dashboard">Dashboard</router-link></li>
        <li><router-link class="text-gray-200" to="/settings">Settings</router-link></li>
      </ul>
    </nav>
    <transition enter-active-class="transition ease-in-out duration-300 transform" enter-from-class="-translate-x-full opacity-0" enter-to-class="translate-x-0 opacity-100" leave-active-class="transition ease-in-out duration-300 transform" leave-from-class="translate-x-0 opacity-100" leave-to-class="-translate-x-full opacity-0">
      <aside v-if="sidebarOpen" class="fixed inset-0 z-40 flex md:hidden">
        <div class="fixed inset-0 opacity-75 transition-opacity duration-300" @click="toggleSidebar"></div>
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
          <div class="absolute top-0 right-0 -mr-14 p-1">
            <button @click="toggleSidebar" class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600">
              <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <nav class="mt-5 px-2 space-y-1">
              <router-link to="/" class="text-blue-500 block px-3 py-2 rounded-md text-base font-medium" @click.native="toggleSidebar">Home</router-link>
              <router-link to="/predictions" class="text-blue-500 block px-3 py-2 rounded-md text-base font-medium" @click.native="toggleSidebar">Predictions</router-link>
              <router-link to="/dashboard" class="text-blue-500 block px-3 py-2 rounded-md text-base font-medium" @click.native="toggleSidebar">Dashboard</router-link>
              <router-link to="/settings" class="text-blue-500 block px-3 py-2 rounded-md text-base font-medium" @click.native="toggleSidebar">Settings</router-link>
            </nav>
          </div>
        </div>
      </aside>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const sidebarOpen = ref(false);
    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };
    return {
      sidebarOpen,
      toggleSidebar
    };
  },
});
</script>
