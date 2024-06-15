<template>
  <div class="bg-gray-100 text-gray-800 w-full h-full">
    <nav class="bg-white shadow py-2 px-4">
      <div class="mx-auto flex items-center justify-between">
        <h1 class="text-xl font-bold m-0">Real-Time Stock Price Predictor</h1>
        <ul class="flex items-center justify-between gap-2 m-0 p-0">
          <li><router-link to="/" class="text-blue-500">Home</router-link></li>
          <li><router-link to="/dashboard" class="text-blue-500">Dashboard</router-link></li>
          <li><router-link to="/settings" class="text-blue-500">Settings</router-link></li>
        </ul>
      </div>
    </nav>
    <main class="mx-auto mt-4">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
