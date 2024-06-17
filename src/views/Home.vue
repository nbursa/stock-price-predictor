<template>
  <div class="p-4">
    <header class="header pt-10 text-center max-w-lg mx-auto">
      <div class="font-bold text-4xl mb-4">Welcome to the</div>
      <h1 class="text-6xl font-extrabold">Real-Time Stock Price Predictor</h1>
      <p class="mt-4">
        Predict future stock prices using machine learning models and view
        real-time updates.
      </p>
    </header>
    <main class="flex flex-col items-center mt-0 w-full">
      <button
        class="px-8 mx-auto w-1/3 min-w-fit"
        @click="navigateToPredictions"
      >
        Start Predicting
      </button>
      <div class="p-6 max-w-lg mx-auto">
        <h2 class="text-2xl font-semibold text-center">Features</h2>
        <ul class="mt-4 p-0 text-sm text-center">
          <li>Fetch historical stock price data</li>
          <li>Clean and preprocess data</li>
          <li>Implement and evaluate multiple machine learning models</li>
          <li>Real-time stock price updates</li>
          <li>Interactive visualizations</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HomePage',
  setup() {
    const router = useRouter()

    const navigateToPredictions = () => {
      router.push('/predictions')
    }

    return {
      navigateToPredictions,
    }
  },
})
</script>
