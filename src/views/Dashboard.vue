<template>
  <div class="min-h-screen p-4">
    <header class="mb-6">
      <h1 class="text-4xl font-bold mb-2">Dashboard</h1>
      <p class="text-lg">Overview of stock predictions and analysis.</p>
    </header>
    <section class="flex flex-col md:flex-row gap-6 mb-6">
      <div class="p-6 rounded-lg shadow-light-sm dark:shadow-dark-sm">
        <h2 class="text-xl font-semibold mb-2">Total Stocks Analyzed</h2>
        <p class="text-3xl font-bold text-blue-300">{{ totalStocks }}</p>
      </div>
      <div class="card p-6 rounded-lg shadow-light-sm dark:shadow-dark-sm">
        <h2 class="text-xl font-semibold mb-2">Prediction Accuracy</h2>
        <p class="text-3xl font-bold text-green-500">
          {{ predictionAccuracy }}%
        </p>
      </div>
      <div class="card p-6 rounded-lg shadow-light-sm dark:shadow-dark-sm">
        <h2 class="text-xl font-semibold mb-2">Most Predicted Stock</h2>
        <p class="text-3xl font-bold text-red-500">{{ mostPredictedStock }}</p>
      </div>
    </section>
    <section class="rounded-lg shadow-light-sm dark:shadow-dark-sm p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">Recent Predictions</h2>
      <div class="flex flex-col">
        <div class="flex font-semibold">
          <div class="w-1/4 py-2 px-4">Stock</div>
          <div class="w-1/4 py-2 px-4">Predicted Price</div>
          <div class="w-1/4 py-2 px-4">Actual Price</div>
          <div class="w-1/4 py-2 px-4">Accuracy</div>
        </div>
        <div v-for="stock in stocks" :key="stock._id" class="flex border-b">
          <div class="w-1/4 py-2 px-4">{{ stock.name }}</div>
          <div class="w-1/4 py-2 px-4">
            ${{ stock.predictedPrice || 'N/A' }}
          </div>
          <div class="w-1/4 py-2 px-4">${{ stock.actualPrice || 'N/A' }}</div>
          <div class="w-1/4 py-2 px-4 text-green-500">
            {{ stock.accuracy || 'N/A' }}%
          </div>
        </div>
      </div>
    </section>
    <section class="rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Stock Performance</h2>
      <div class="relative h-64">
        <canvas ref="performanceChart"></canvas>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { fetchStocks, fetchPredictionStats } from '../services/api'
import { Stock } from '../types'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    const stocks = ref<Stock[]>([])
    const totalStocks = ref<number>(0)
    const predictionAccuracy = ref<number>(0)
    const mostPredictedStock = ref<string>('N/A')
    const performanceChartRef = ref<HTMLCanvasElement | null>(null)

    const loadChart = () => {
      if (performanceChartRef.value && stocks.value.length > 0) {
        new Chart(performanceChartRef.value, {
          type: 'line',
          data: {
            labels: stocks.value.map((stock) => stock.name),
            datasets: [
              {
                label: 'Predicted Price',
                data: stocks.value.map((stock) => stock.predictedPrice || 0),
                borderColor: '#42A5F5',
                fill: false,
              },
              {
                label: 'Actual Price',
                data: stocks.value.map((stock) => stock.actualPrice || 0),
                borderColor: '#66BB6A',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        })
      }
    }

    const fetchData = async () => {
      try {
        const [stockData, stats] = await Promise.all([
          fetchStocks(),
          fetchPredictionStats(),
        ])
        stocks.value = stockData
        totalStocks.value = stockData.length
        predictionAccuracy.value = stats.accuracy || 0
        mostPredictedStock.value = stats.mostPredictedStock || 'N/A'
        console.log('Stocks:', stockData)
        console.log('Stats:', stats)
        loadChart()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    onMounted(fetchData)

    watch([performanceChartRef, stocks], ([newRef, newStocks]) => {
      if (newRef && newStocks.length > 0) {
        loadChart()
      }
    })

    return {
      stocks,
      totalStocks,
      predictionAccuracy,
      mostPredictedStock,
      performanceChartRef,
    }
  },
})
</script>
