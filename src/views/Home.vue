<template>
  <div class="home p-4">
    <header class="header py-10 text-center max-w-lg mx-auto">
      <div class="font-bold text-4xl mb-4">Welcome to the</div>
      <h1 class="text-6xl font-extrabold">Real-Time Stock Price Predictor</h1>
      <p class="mt-4">
        Predict future stock prices using machine learning models and view
        real-time updates.
      </p>
    </header>
    <main class="mt-0">
      <div class="p-6 max-w-lg mx-auto">
        <h2 class="text-2xl font-semibold text-center">Features</h2>
        <ul class="mt-4 p-0 space-y-2 text-center">
          <li class="text-gray-200">Fetch historical stock price data</li>
          <li class="text-gray-200">Clean and preprocess data</li>
          <li class="text-gray-200">
            Implement and evaluate multiple machine learning models
          </li>
          <li class="text-gray-200">Real-time stock price updates</li>
          <li class="text-gray-200">Interactive visualizations</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
})
</script>
