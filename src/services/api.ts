import axios from 'axios'
import { Stock, PredictionStats } from '../types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const EXCHANGE_RATE_API_URL = import.meta.env
  .VITE_APP_EXCHANGE_RATE_API_URL as string
const PREDICTION_API_URL = import.meta.env.VITE_APP_PREDICTION_API_URL as string

export const fetchStocks = async (): Promise<Stock[]> => {
  try {
    const response = await apiClient.get('/api/stocks')
    return response.data
  } catch (error) {
    console.error('Error fetching stocks:', error)
    throw new Error('Failed to fetch stocks')
  }
}

export const addStock = async (data: Partial<Stock>): Promise<Stock> => {
  try {
    const response = await apiClient.post('/api/stocks', data)
    return response.data
  } catch (error) {
    console.error('Error adding stock:', error)
    throw new Error('Failed to add stock')
  }
}

export const getPredictions = async (data: any): Promise<any> => {
  console.log(
    'Sending prediction request with data:',
    `${PREDICTION_API_URL}/predict`,
    data,
  )
  try {
    console.log('Sending prediction request with data:', data)
    const response = await axios.post(`${PREDICTION_API_URL}/predict`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error: any) {
    console.error('Error getting predictions:', error.response?.data || error)
    throw new Error('Failed to get predictions')
  }
}

export const getExchangeRates = async (
  baseCurrency: string,
): Promise<Record<string, number>> => {
  try {
    const response = await axios.get(`${EXCHANGE_RATE_API_URL}${baseCurrency}`)
    return response.data.rates
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    throw new Error('Failed to fetch exchange rates')
  }
}

export const fetchPredictionStats = async (): Promise<PredictionStats> => {
  try {
    const response = await apiClient.get('/api/stats')
    return response.data
  } catch (error) {
    console.error('Error fetching prediction stats:', error)
    throw new Error('Failed to fetch prediction stats')
  }
}

export const trainModel = async (data: any): Promise<any> => {
  try {
    console.log('Sending training request with data:', data)
    const response = await axios.post(`${PREDICTION_API_URL}/train`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error: any) {
    console.error('Error training model:', error.response?.data || error)
    throw new Error('Failed to train model')
  }
}
