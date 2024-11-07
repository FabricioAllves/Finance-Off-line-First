import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    apikey: process.env.EXPO_PUBLIC_API_KEY,
    Prefer: 'return=representation',
  },
});
