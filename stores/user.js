import { defineStore } from 'pinia';
import axios from '@/plugins/axios';
import { setHeaderToken } from '@/includes/auth';

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    token: '',
    authenticated: false,
  }),
  actions: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.token = localStorage.getItem('token');
      setHeaderToken(localStorage.getItem('token'));
    },
    login(payload) {
      return new Promise((resolve, reject) => {
        $axios
          .post('/login', payload)
          .then((res) => {
            this.user = res.data.data.user;
            this.token = res.data.data.token;
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.data.user));
            setHeaderToken(res.data.data.token);
            resolve(res);
          })
          .catch((error) => {
            localStorage.removeItem('token');
            this.user = null;
            this.isLogined = false;
            reject(error);
          });
      });
    },
    async logout() {
      const token = this.token || localStorage.getItem('token');
      try {
        await $axios.post('/logout', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = {};
        localStorage.removeItem('token');
        this.token = '';
        this.authenticated = false;
      } catch (e) {
        this.user = {};
        localStorage.removeItem('token');
        this.token = '';
        this.authenticated = false;
      }
    },
  },
});
