<template>
  <div class="home">
    <header class="header py-10 text-center">
      <h1 class="text-4xl font-bold text-gray-800">Welcome to the Real-Time Stock Price Predictor</h1>
      <p class="text-lg text-gray-600 mt-4">Predict future stock prices using machine learning models and view real-time updates.</p>
    </header>
    <main class="main-content mt-10">
      <div class="card bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <h2 class="text-2xl font-semibold text-gray-700 text-center">Features</h2>
        <ul class="mt-4 p-0 space-y-2 text-center">
          <li class="text-gray-600">Fetch historical stock price data</li>
          <li class="text-gray-600">Clean and preprocess data</li>
          <li class="text-gray-600">Implement and evaluate multiple machine learning models</li>
          <li class="text-gray-600">Real-time stock price updates</li>
          <li class="text-gray-600">Interactive visualizations</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
});
</script>
