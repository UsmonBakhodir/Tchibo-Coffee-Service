import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

export const getProducts = (category) =>
  api.get('/products', { params: category ? { category } : {} });

export const placeOrder = (orderData) =>
  api.post('/orders', orderData);

export const makeReservation = (reservationData) =>
  api.post('/reservations', reservationData);

export const trackOrder = (id) =>
  api.get(`/orders/${id}`);
