import axios from 'axios';
import { Stock, PredictionStats } from '../types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const EXCHANGE_RATE_API_URL = import.meta.env.VITE_APP_EXCHANGE_RATE_API_URL as string;
const PREDICTION_API_URL = import.meta.env.VITE_APP_PREDICTION_API_URL as string;

export const fetchStocks = async (): Promise<Stock[]> => {
  const response = await apiClient.get('/api/stocks');
  return response.data;
};

export const addStock = async (data: any): Promise<Stock> => {
  const response = await apiClient.post('/api/stocks', data);
  return response.data;
};

export const getPredictions = async (data: any) => {
  const response = await axios.post(`${PREDICTION_API_URL}/predict`, data);
  return response.data;
};

export const getExchangeRates = async (baseCurrency: string) => {
  const response = await axios.get(`${EXCHANGE_RATE_API_URL}${baseCurrency}`);
  return response.data.rates;
};

export const fetchPredictionStats = async (): Promise<PredictionStats> => {
  const response = await apiClient.get('/api/stats');
  return response.data;
};
