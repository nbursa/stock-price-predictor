import axios from 'axios';
import { Stock } from '../types';

const apiClient = axios.create({
  baseURL: 'http://localhost:5005/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchStocks = async (): Promise<Stock[]> => {
  const response = await apiClient.get('/stocks');
  return response.data;
};

export const addStock = async (data: any): Promise<Stock> => {
  const response = await apiClient.post('/stocks', data);
  return response.data;
};
