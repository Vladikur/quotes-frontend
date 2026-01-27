import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:3000/api',
  timeout: 10000
});

/**
 * Поиск цитат
 * @param {Object} data
 * @param {string} [data.search]
 * @param {string} [data.searchId]
 * @param {number} data.page
 * @param {number} data.limit
 */
export function getQuotes(data) {
  return api.post('/quotes', data);
}

/**
 * Загрузить массив цитат
 * @param {Array<Object>} quotes
 */
export function uploadQuotes(quotes) {
  return api.post('/quotes/bulk', { quotes });
}

/**
 * Обновить цитату
 * @param {string|number} id
 * @param {Object} quote
 */
export function updateQuote(id, quote) {
  return api.put(`/quotes/${id}`, quote);
}

/**
 * Получить одну цитату по id
 * @param {string|number} id
 */
export function getQuoteById(id) {
  return api.get(`/quotes/${id}`);
}

/**
 * Удаление цитаты
 * @param {string|number} id
 */
export function deleteQuote(id) {
  return api.delete(`/quotes/${id}`)
}
