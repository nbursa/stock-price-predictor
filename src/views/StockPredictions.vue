<template>
  <div class="p-6 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">Stock Predictions</h1>
    <form @submit.prevent="predictStock" class="mb-6 max-w-xl mx-auto">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="">
          <label for="open" class="block text-sm font-medium ">Stock price (Open)</label>
          <input id="open" type="number" v-model.number="inputData.Open" placeholder="Enter opening price" class="mt-1 w-full px-2 py-1 border rounded-lg text-gray-800" />
        </div>
        <div class="">
          <label for="high" class="block text-sm font-medium">Stock price (High)</label>
          <input id="high" type="number" v-model.number="inputData.High" placeholder="Enter highest price" class="mt-1 w-full px-2 py-1 border rounded-lg text-gray-800" />
        </div>
        <div class="">
          <label for="low" class="block text-sm font-medium">Stock price (Low)</label>
          <input id="low" type="number" v-model.number="inputData.Low" placeholder="Enter lowest price" class="mt-1 w-full px-2 py-1 border rounded-lg text-gray-800" />
        </div>
        <div class="">
          <label for="close" class="block text-sm font-medium">Stock price (Close)</label>
          <input id="close" type="number" v-model.number="inputData.Close" placeholder="Enter closing price" class="mt-1 w-full px-2 py-1 border rounded-lg text-gray-800" />
        </div>
      </div>

      <div class="md:col-span-2">
        <button type="submit" class="w-full px-4 py-2 bg-white text-gray-800 rounded-lg">Predict</button>
      </div>
    </form>
    <div v-if="loading" class="text-blue-500 mb-4">Fetching predictions...</div>
    <div v-if="status" class="text-blue-500 mb-4">{{ status }}</div>
    <div v-if="predictions.length">
      <h2 class="text-2xl font-semibold mb-4">Prediction:</h2>
      <ul class="space-y-2">
        <li v-for="(prediction, index) in predictions" :key="index" class="p-4 bg-white shadow rounded-lg">
          <span class="text-sm">Predicted Volume:</span> {{ prediction.toFixed(2) }}
        </li>
      </ul>
    </div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="pastPredictions.length" class="flex flex-col items-center justify-between">
      <h2 class="text-2xl font-semibold mb-4">Past Predictions:</h2>
      <ul class="flex flex-wrap gap-3 list-none m-0 p-0 mx-auto">
        <li v-for="(pastPrediction, index) in pastPredictions" :key="index" class="p-2 pr-4 shadow-lg rounded-lg border border-white">

          <div class="mb-4 text-xs pl-2 flex items-center justify-between"><span class="rounded-full bg-white text-gray-800 inline-flex w-5 h-5 items-center justify-center">{{index + 1}}</span> <span>Date: {{ new Date(pastPrediction.date).toLocaleString() }}</span></div>
          <div class="flex items-center justify-start mb-4 text-sm pl-2">
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
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { getPredictions } from '../services/api';

export default defineComponent({
  name: 'StockPredictions',
  setup() {
    const inputData = reactive<{ Open: number, High: number, Low: number, Close: number }>({ Open: 0, High: 0, Low: 0, Close: 0 });
    const predictions = ref<number[]>([]);
    const pastPredictions = ref<any[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const status = ref<string | null>(null);

    const loadPastPredictions = () => {
      const storedPredictions = localStorage.getItem('pastPredictions');
      if (storedPredictions) {
        pastPredictions.value = JSON.parse(storedPredictions);
      }
    };

    const savePrediction = (prediction: number) => {
      const newPrediction = { ...inputData, Prediction: prediction, date: new Date().toISOString() };
      pastPredictions.value.push(newPrediction);
      localStorage.setItem('pastPredictions', JSON.stringify(pastPredictions.value));
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

    onMounted(() => {
      loadPastPredictions();
    });

    return {
      inputData,
      predictions,
      pastPredictions,
      predictStock,
      error,
      loading,
      status,
    };
  },
});
</script>
