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
