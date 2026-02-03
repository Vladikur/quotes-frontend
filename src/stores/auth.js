import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
  }),
  actions: {
    login(token, role) {
      this.token = token;
      this.role = role;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    },
    logout() {
      this.token = null;
      this.role = null;
      localStorage.clear();
    },
  },
});
