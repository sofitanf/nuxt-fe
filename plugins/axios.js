import axios from 'axios';

// Export axios as a plugin in nuxt3 using defineNuxtPlugin
export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.baseURL = 'http://localhost:8000/api';
  axios.defaults.withCredentials = true;
  return {
    provide: {
      axios: axios,
    },
  };
});
