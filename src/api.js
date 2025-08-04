import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend URL
});

export const fetchCustomers = () => API.get('/customers');