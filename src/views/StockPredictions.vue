<template>
  <div class="p-6 min-h-screen">
    <!--    <h1 class="text-3xl font-bold mb-6">Stock Predictions</h1>-->
    <header class="mb-10 text-center">
      <h1 class="text-2xl font-bold mb-2">Stock Predictions</h1>
      <p class="text-sm">Train model for prediction.</p>
    </header>
    <!-- Train Model Form -->
    <form @submit.prevent="trainStock" class="mb-1 max-w-xl mx-auto">
      <div class="grid grid-cols-2 gap-4 mb-8">
        <!-- Stock Selection -->
        <div>
          <label for="train-stock" class="block text-xs font-medium"
            >Stock</label
          >
          <select
            id="train-stock"
            v-model="trainData.Stock"
            class="mt-1 w-full px-2 py-1 border rounded-lg"
          >
            <option v-for="stock in stocks" :key="stock" :value="stock">
              {{ stock }}
            </option>
          </select>
        </div>
        <!-- Feature Inputs -->
        <div v-for="i in 4" :key="'train-feature' + i">
          <label :for="'train-feature' + i" class="block text-xs font-medium"
            >Feature {{ i }}</label
          >
          <input
            :id="'train-feature' + i"
            type="number"
            v-model.number="trainData['feature' + i]"
            :placeholder="'Enter feature ' + i"
            class="mt-1 w-full px-2 py-1 border rounded-lg"
          />
        </div>
        <!-- Target Input -->
        <div>
          <label for="train-target" class="block text-xs font-medium"
            >Target</label
          >
          <input
            id="train-target"
            type="number"
            v-model.number="trainData.target"
            placeholder="Enter target value"
            class="mt-1 w-full px-2 py-1 border rounded-lg"
          />
        </div>
      </div>
      <!-- Submit Button -->
      <div class="md:col-span-2">
        <button type="submit" class="w-full px-4 py-1 mb-8" :disabled="loading">
          Train Model
        </button>
      </div>
    </form>
    <!-- Predict Stock Form -->
    <form @submit.prevent="predictStock" class="mb-1 max-w-xl mx-auto">
      <div class="grid grid-cols-2 gap-4 mb-8">
        <!-- Stock Selection -->
        <div>
          <label for="predict-stock" class="block text-xs font-medium"
            >Stock</label
          >
          <select
            id="predict-stock"
            v-model="predictData.Stock"
            class="mt-1 w-full px-2 py-1 border rounded-lg"
          >
            <option v-for="stock in stocks" :key="stock" :value="stock">
              {{ stock }}
            </option>
          </select>
        </div>
        <!-- Feature Inputs -->
        <div v-for="i in 4" :key="'predict-feature' + i">
          <label :for="'predict-feature' + i" class="block text-xs font-medium"
            >Feature {{ i }}</label
          >
          <input
            :id="'predict-feature' + i"
            type="number"
            v-model.number="predictData['feature' + i]"
            :placeholder="'Enter feature ' + i"
            class="mt-1 w-full px-2 py-1 border rounded-lg"
          />
        </div>
      </div>
      <!-- Submit Button -->
      <div class="md:col-span-2">
        <button type="submit" class="w-full px-4 py-1 mb-8" :disabled="loading">
          Predict
        </button>
      </div>
    </form>
    <!-- Status and Loading Messages -->
    <div v-if="loading" class="text-blue-500 mb-4 text-center">
      Processing...
    </div>
    <div v-if="status" class="text-blue-500 text-center">{{ status }}</div>
    <!-- Predictions -->
    <div v-if="predictions.length" class="text-center">
      <h2 class="text-xl font-thin mt-4 mb-0">Predicted Volume</h2>
      <ul class="m-0 p-0">
        <li
          v-for="(prediction, index) in predictions"
          :key="index"
          class="p-4 shadow rounded-lg"
        >
          <span class="text-2xl font-bold shadow-sm dark:shadow-dark-lg">{{
            prediction?.toFixed(2)
          }}</span>
        </li>
      </ul>
    </div>
    <!-- Error Message -->
    <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
    <!-- Charts -->
    <div
      v-if="showCharts"
      class="mt-4 flex flex-col sm:flex-row sm:justify-center gap-4 mx-auto"
    >
      <div class="relative h-64 w-full sm:w-1/3">
        <line-chart
          :data="lineChartData"
          :options="chartOptions"
          class="h-full"
        ></line-chart>
      </div>
      <div class="relative h-64 w-full sm:w-1/3 mt-8 sm:mt-0">
        <bar-chart
          :data="barChartData"
          :options="chartOptions"
          class="h-full"
        ></bar-chart>
      </div>
    </div>
    <!-- Past Predictions -->
    <div
      v-if="pastPredictions.length"
      class="flex flex-col items-center justify-between"
    >
      <h2 class="text-2xl font-semibold mb-4">Past Predictions:</h2>
      <ul
        class="flex flex-col items-center justify-center gap-3 list-none m-0 p-0 mx-auto max-w-2xl text-center"
      >
        <li
          v-for="(pastPrediction, index) in pastPredictions"
          :key="index"
          class="flex items-center justify-center gap-2 pr-4 shadow-sm dark:shadow-dark-sm rounded-lg"
        >
          <div class="text-xs pl-2 flex items-center justify-between mr-4">
            <span
              class="rounded-full bg-white text-gray-800 inline-flex w-5 h-5 items-center justify-center"
              >{{ index + 1 }}</span
            >
            <span
              >Date: {{ new Date(pastPrediction.date).toLocaleString() }}</span
            >
          </div>
          <div class="flex items-center justify-start text-sm pl-2">
            <div class="mr-2">Feature 1: {{ pastPrediction.feature1 }}</div>
            <div class="mr-2">Feature 2: {{ pastPrediction.feature2 }}</div>
            <div class="mr-2">Feature 3: {{ pastPrediction.feature3 }}</div>
            <div>Feature 4: {{ pastPrediction.feature4 }}</div>
          </div>
          <div class="text-xs text-end">
            Predicted Volume:
            <span class="text-lg">{{
              pastPrediction?.Prediction?.toFixed(2)
            }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, watch } from 'vue'
import { getPredictions, trainModel, fetchStocks } from '../services/api'
import { PastPrediction, PredictData, TrainData } from '../types.ts'
import { Line, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
)

export default defineComponent({
  name: 'StockPredictions',
  components: {
    LineChart: Line,
    BarChart: Bar,
  },
  setup() {
    const trainData = reactive<TrainData>({
      Stock: '',
      feature1: 0,
      feature2: 0,
      feature3: 0,
      feature4: 0,
      target: 0,
    })

    const predictData = reactive<PredictData>({
      Stock: '',
      feature1: 0,
      feature2: 0,
      feature3: 0,
      feature4: 0,
    })

    const predictions = ref<number[]>([])
    const pastPredictions = ref<PastPrediction[]>([])
    const error = ref<string | null>(null)
    const loading = ref(false)
    const status = ref<string | null>(null)
    const showCharts = ref(false)
    const stocks = ref<string[]>([])

    const lineChartData = ref({
      labels: [] as string[],
      datasets: [
        {
          label: 'Feature 1',
          data: [] as number[],
          borderColor: '#42A5F5',
          fill: true,
        },
        {
          label: 'Feature 2',
          data: [] as number[],
          borderColor: '#66BB6A',
          fill: false,
        },
        {
          label: 'Feature 3',
          data: [] as number[],
          borderColor: '#FFA726',
          fill: false,
        },
        {
          label: 'Feature 4',
          data: [] as number[],
          borderColor: '#FF7043',
          fill: false,
        },
      ],
    })

    const barChartData = ref({
      labels: [] as string[],
      datasets: [
        { label: 'Volume', backgroundColor: '#42A5F5', data: [] as number[] },
      ],
    })

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
    })

    const loadPastPredictions = () => {
      const storedPredictions = localStorage.getItem('pastPredictions')
      if (storedPredictions) {
        pastPredictions.value = JSON.parse(storedPredictions)
        updateCharts()
      }
    }

    const fetchStocksList = async () => {
      try {
        const response = await fetchStocks()
        console.log('Stocks:', response) // Debug stocks
        stocks.value = response.map((stock: any) => stock.name)
      } catch (error) {
        console.error('Error fetching stocks:', error)
      }
    }

    const savePrediction = (prediction: number) => {
      const newPrediction: PastPrediction = {
        ...predictData,
        Prediction: prediction,
        date: new Date().toISOString(),
      }
      pastPredictions.value.push(newPrediction)
      localStorage.setItem(
        'pastPredictions',
        JSON.stringify(pastPredictions.value),
      )
      updateCharts()
    }

    const updateCharts = () => {
      const labels = pastPredictions.value.map((p) =>
        new Date(p.date).toLocaleString(),
      )
      lineChartData.value.labels = labels
      lineChartData.value.datasets[0].data = pastPredictions.value.map(
        (p) => p.feature1,
      )
      lineChartData.value.datasets[1].data = pastPredictions.value.map(
        (p) => p.feature2,
      )
      lineChartData.value.datasets[2].data = pastPredictions.value.map(
        (p) => p.feature3,
      )
      lineChartData.value.datasets[3].data = pastPredictions.value.map(
        (p) => p.feature4,
      )
      barChartData.value.labels = labels
      barChartData.value.datasets[0].data = pastPredictions.value.map(
        (p) => p.Prediction,
      )

      console.log('lineChartData:', lineChartData.value) // Debug lineChartData
      console.log('barChartData:', barChartData.value) // Debug barChartData
      showCharts.value = true
    }

    const trainStock = async () => {
      try {
        loading.value = true
        error.value = null
        status.value = 'Training model...'
        const data = { data: [trainData] }
        await trainModel(data)
        status.value = 'Model trained successfully!'
        setTimeout(() => (status.value = null), 7000)
      } catch (err: any) {
        error.value = 'Failed to train model'
        console.error('Error training model:', err.response?.data || err)
      } finally {
        loading.value = false
      }
    }

    const predictStock = async () => {
      try {
        loading.value = true
        error.value = null
        status.value = 'Fetching predictions...'
        const response = await getPredictions(predictData)
        predictions.value = response
        savePrediction(response[0])
        status.value = 'Predictions fetched successfully!'
        setTimeout(() => (status.value = null), 7000)
      } catch (err: any) {
        error.value = 'Failed to fetch predictions'
        console.error('Error fetching predictions:', err.response?.data || err)
      } finally {
        loading.value = false
      }
    }

    watch(pastPredictions, updateCharts, { deep: true })

    onMounted(() => {
      loadPastPredictions()
      fetchStocksList()
    })

    return {
      trainData,
      predictData,
      trainStock,
      predictStock,
      predictions,
      pastPredictions,
      error,
      loading,
      status,
      showCharts,
      lineChartData,
      barChartData,
      chartOptions,
      stocks,
    }
  },
})
</script>
