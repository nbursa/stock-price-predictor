<template>
  <div class="p-6 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">Stock Predictions</h1>
    <form @submit.prevent="predictStock" class="mb-6 max-w-xl mx-auto">
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="">
          <label for="open" class="block text-xs font-medium">Open</label>
          <input id="open" type="number" v-model.number="inputData.Open" placeholder="Enter opening price" class="mt-1 w-full px-2 py-1 border rounded-lg" />
        </div>
        <div class="">
          <label for="high" class="block text-xs font-medium">High</label>
          <input id="high" type="number" v-model.number="inputData.High" placeholder="Enter highest price" class="mt-1 w-full px-2 py-1 border rounded-lg" />
        </div>
        <div class="">
          <label for="low" class="block text-xs font-medium">Low</label>
          <input id="low" type="number" v-model.number="inputData.Low" placeholder="Enter lowest price" class="mt-1 w-full px-2 py-1 border rounded-lg" />
        </div>
        <div class="">
          <label for="close" class="block text-xs font-medium">Close</label>
          <input id="close" type="number" v-model.number="inputData.Close" placeholder="Enter closing price" class="mt-1 w-full px-2 py-1 border rounded-lg" />
        </div>
<!--        <div class="">-->
<!--          <label for="currency" class="block text-xs font-medium">Currency</label>-->
<!--          <select id="currency" v-model="selectedCurrency" @change="fetchExchangeRates" class="mt-1 w-full px-2 py-1 border rounded-lg">-->
<!--            <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>-->
<!--          </select>-->
<!--        </div>-->
      </div>
      <div class="md:col-span-2">
        <button type="submit" class="w-full px-4 py-2 rounded-lg bg-blue-500 text-white">Predict</button>
      </div>
    </form>

    <div v-if="loading" class="text-blue-500 mb-4">Fetching predictions...</div>

    <div v-if="status" class="text-blue-500 mb-4">{{ status }}</div>

    <div v-if="predictions.length" class="text-center">
      <h2 class="text-xl font-thin mt-16 mb-0">Predicted Volume</h2>
      <ul class="m-0 p-0">
        <li v-for="(prediction, index) in predictions" :key="index" class="p-4 shadow rounded-lg">
          <span class="text-2xl font-bold">{{ prediction.toFixed(2) }}</span>
        </li>
      </ul>
    </div>

    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="showCharts" class="mt-8 flex flex-col sm:flex-row sm:justify-center gap-4 mx-auto">
      <div class="relative h-64 w-full sm:w-1/3">
        <line-chart :data="lineChartData" :options="chartOptions" class="h-full"></line-chart>
      </div>
      <div class="relative h-64 w-full sm:w-1/3 mt-8 sm:mt-0">
        <bar-chart :data="barChartData" :options="chartOptions" class="h-full"></bar-chart>
      </div>
    </div>

    <div v-if="pastPredictions.length" class="flex flex-col items-center justify-between">
      <h2 class="text-2xl font-semibold mb-4">Past Predictions:</h2>
      <ul class="flex flex-col items-center justify-center gap-3 list-none m-0 p-0 mx-auto max-w-2xl text-center">
        <li v-for="(pastPrediction, index) in pastPredictions" :key="index" class="flex items-center justify-center gap-2 pr-4 shadow-lg rounded-lg border border-white">
          <div class="text-xs pl-2 flex items-center justify-between mr-4">
            <span class="rounded-full bg-white text-gray-800 inline-flex w-5 h-5 items-center justify-center">{{index + 1}}</span>
            <span>Date: {{ new Date(pastPrediction.date).toLocaleString() }}</span>
          </div>
          <div class="flex items-center justify-start text-sm pl-2">
            <div class="mr-2">Open: {{ pastPrediction.Open }}</div>
            <div class="mr-2">High: {{ pastPrediction.High }}</div>
            <div class="mr-2">Low: {{ pastPrediction.Low }}</div>
            <div>Close: {{ pastPrediction.Close }}</div>
          </div>
          <div class="text-xs text-end">Predicted Volume: <span class="text-lg">{{ pastPrediction.Prediction.toFixed(2) }}</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, onMounted } from 'vue';
import { getPredictions, getExchangeRates } from '../services/api';
import { Line, Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, PointElement);

export default defineComponent({
  name: 'StockPredictions',
  components: {
    LineChart: Line,
    BarChart: Bar
  },
  setup() {
    const inputData = reactive<{ Open: number, High: number, Low: number, Close: number }>({ Open: 0, High: 0, Low: 0, Close: 0 });
    const predictions = ref<number[]>([]);
    const pastPredictions = ref<any[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const status = ref<string | null>(null);
    const showCharts = ref<boolean>(false);
    const selectedCurrency = ref<string>('USD');
    const exchangeRates = ref<Record<string, number>>({});

    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

    const lineChartData = ref({
      labels: [] as string[],
      datasets: [
        {
          label: 'Open',
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5',
          data: [] as number[],
          fill: false
        },
        {
          label: 'High',
          backgroundColor: '#66BB6A',
          borderColor: '#66BB6A',
          data: [] as number[],
          fill: false
        },
        {
          label: 'Low',
          backgroundColor: '#FFA726',
          borderColor: '#FFA726',
          data: [] as number[],
          fill: false
        },
        {
          label: 'Close',
          backgroundColor: '#FF7043',
          borderColor: '#FF7043',
          data: [] as number[],
          fill: false
        }
      ]
    });

    const barChartData = ref({
      labels: [] as string[],
      datasets: [
        {
          label: 'Volume',
          backgroundColor: '#42A5F5',
          data: [] as number[]
        }
      ]
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false
    });

    const loadPastPredictions = () => {
      const storedPredictions = localStorage.getItem('pastPredictions');
      if (storedPredictions) {
        pastPredictions.value = JSON.parse(storedPredictions);
        updateCharts();
      }
    };

    const fetchExchangeRates = async () => {
      try {
        const rates = await getExchangeRates(selectedCurrency.value);
        exchangeRates.value = rates;
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    const savePrediction = (prediction: number) => {
      const newPrediction = { ...inputData, Prediction: prediction, date: new Date().toISOString() };
      pastPredictions.value.push(newPrediction);
      localStorage.setItem('pastPredictions', JSON.stringify(pastPredictions.value));
      updateCharts();
    };

    const updateCharts = () => {
      const labels = pastPredictions.value.map((p: any) => new Date(p.date).toLocaleString());
      lineChartData.value.labels = labels;
      barChartData.value.labels = labels;

      lineChartData.value.datasets[0].data = pastPredictions.value.map((p: any) => p.Open);
      lineChartData.value.datasets[1].data = pastPredictions.value.map((p: any) => p.High);
      lineChartData.value.datasets[2].data = pastPredictions.value.map((p: any) => p.Low);
      lineChartData.value.datasets[3].data = pastPredictions.value.map((p: any) => p.Close);
      barChartData.value.datasets[0].data = pastPredictions.value.map((p: any) => p.Prediction);

      showCharts.value = true;
    };

    const predictStock = async () => {
      try {
        loading.value = true;
        error.value = null;
        status.value = 'Fetching predictions...';

        const data = {
          Open: inputData.Open || 0,
          High: inputData.High || 0,
          Low: inputData.Low || 0,
          Close: inputData.Close || 0,
        };

        // Convert data to selected currency
        const rate = exchangeRates.value[selectedCurrency.value];
        if (rate) {
          data.Open *= rate;
          data.High *= rate;
          data.Low *= rate;
          data.Close *= rate;
        }

        const response = await getPredictions([data]);
        predictions.value = response;
        savePrediction(response[0]);
        status.value = 'Predictions fetched successfully!';
        setTimeout(() => status.value = null, 7000);
      } catch (err) {
        error.value = 'Failed to fetch predictions';
        status.value = null;
        console.error('Error fetching predictions:', err);
      } finally {
        loading.value = false;
      }
    };

    watch(pastPredictions, updateCharts, { deep: true });

    onMounted(() => {
      loadPastPredictions();
      fetchExchangeRates(); // Fetch exchange rates when component mounts
    });

    return {
      inputData,
      predictions,
      pastPredictions,
      predictStock,
      error,
      loading,
      status,
      showCharts,
      lineChartData,
      barChartData,
      chartOptions,
      selectedCurrency,
      currencies,
      fetchExchangeRates
    };
  },
});
</script>
