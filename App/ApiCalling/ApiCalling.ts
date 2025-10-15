import axios, { AxiosInstance, AxiosResponse } from 'axios';

// ✅ Step 1: Create a reusable Axios instance
const api: AxiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com/', // <-- Add you api base url here.
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Step 2: Add interceptors
api.interceptors.request.use(
  async config => {
    // Example: add token here
    const token = ''; // TODO: get the token from AsyncStorage if needed.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error?.response || error);
    return Promise.reject(error);
  },
);

// ✅ Step 3: Generic reusable API methods

export const GETAPICALL = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('GET Error:', error);
    throw error;
  }
};

export const POSTAPICALL = async <T>(
  endpoint: string,
  body: object,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(endpoint, body);
    return response.data;
  } catch (error) {
    console.error('POST Error:', error);
    throw error;
  }
};

export const PUTAPICALL = async <T>(
  endpoint: string,
  body: object,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.put(endpoint, body);
    return response.data;
  } catch (error) {
    console.error('PUT Error:', error);
    throw error;
  }
};

export const DELETEAPICALL = async <T>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('DELETE Error:', error);
    throw error;
  }
};
