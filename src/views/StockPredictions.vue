<template>
  <div>
    <h1>Stock Predictions</h1>
    <form @submit.prevent="predictStock">
      <input v-model="inputData.feature1" placeholder="Feature 1" />
      <input v-model="inputData.feature2" placeholder="Feature 2" />
      <input v-model="inputData.feature3" placeholder="Feature 3" />
      <button type="submit">Predict</button>
    </form>
    <div v-if="predictions.length">
      <h2>Predictions:</h2>
      <ul>
        <li v-for="(prediction, index) in predictions" :key="index">{{ prediction }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getPredictions } from '../services/api';

export default defineComponent({
  name: 'StockPredictions',
  setup() {
    const inputData = ref({ feature1: 0, feature2: 0, feature3: 0 });
    const predictions = ref<number[]>([]);

    const predictStock = async () => {
      const data = [inputData.value];
      predictions.value = await getPredictions(data);
    };

    return {
      inputData,
      predictions,
      predictStock,
    };
  },
});
</script>
