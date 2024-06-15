<template>
  <div class="dashboard min-h-screen bg-gray-100 p-4">
    <header class="mb-6">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p class="text-lg text-gray-600">Overview of stock predictions and analysis.</p>
    </header>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <div class="card p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Total Stocks Analyzed</h2>
        <p class="text-3xl font-bold text-blue-500">{{ totalStocks }}</p>
      </div>
      <div class="card p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Prediction Accuracy</h2>
        <p class="text-3xl font-bold text-green-500">85%</p>
      </div>
      <div class="card p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Most Predicted Stock</h2>
        <p class="text-3xl font-bold text-red-500">AAPL</p>
      </div>
    </section>
    <section class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Recent Predictions</h2>
      <table class="min-w-full bg-white">
        <thead>
        <tr>
          <th class="py-2 px-4 bg-gray-200 text-left text-gray-600 font-semibold">Stock</th>
          <th class="py-2 px-4 bg-gray-200 text-left text-gray-600 font-semibold">Predicted Price</th>
          <th class="py-2 px-4 bg-gray-200 text-left text-gray-600 font-semibold">Actual Price</th>
          <th class="py-2 px-4 bg-gray-200 text-left text-gray-600 font-semibold">Accuracy</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="stock in stocks" :key="stock._id">
          <td class="py-2 px-4 border-b border-gray-200">{{ stock.name }}</td>
          <td class="py-2 px-4 border-b border-gray-200">${{ stock.predictedPrice }}</td>
          <td class="py-2 px-4 border-b border-gray-200">${{ stock.actualPrice }}</td>
          <td class="py-2 px-4 border-b border-gray-200 text-green-500">{{ stock.accuracy }}%</td>
        </tr>
        </tbody>
      </table>
    </section>
    <section class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Stock Performance</h2>
      <div class="relative h-64">
        <!-- Placeholder for a chart -->
        <p class="text-center text-gray-500">Chart will be displayed here</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fetchStocks } from '../services/api';
import { Stock } from '../types';

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    const stocks = ref<Stock[]>([]);
    const totalStocks = ref<number>(0);

    onMounted(async () => {
      const data = await fetchStocks();
      stocks.value = data;
      totalStocks.value = data.length;
    });

    return {
      stocks,
      totalStocks,
    };
  },
});
</script>

<style scoped>
.dashboard {
  font-family: var(--font-family-sans);
}
.card {
  background-color: var(--color-background);
  border-radius: 1em;
  padding: var(--spacing-lg);
  box-shadow: 0 0 1em var(--color-shadow);
}
</style>
