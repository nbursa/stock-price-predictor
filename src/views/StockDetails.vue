<template>
  <div class="stock-details">
    <h1>Stock List</h1>
    <h2 class="text-2xl font-bold">Stock Details</h2>
    <p>Detailed information and prediction for a specific stock.</p>

    <ul>
      <li v-for="stock in stocks" :key="stock._id">
        {{ stock.name }} - ${{ stock.price }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { fetchStocks } from '../services/api'
import { Stock } from '../types'

export default defineComponent({
  name: 'StockDetailsPage',
  setup() {
    const stocks = ref<Stock[]>([])

    onMounted(async () => {
      stocks.value = await fetchStocks()
    })

    return {
      stocks,
    }
  },
})
</script>
