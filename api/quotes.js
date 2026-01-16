import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
});

/**
 * Поиск цитат
 * @param {Object} params
 * @param {string} params.search
 * @param {number} params.page
 * @param {number} params.limit
 */

export function getQuotes(params) {
  return api.get('/quotes', {
    params
  });
}
