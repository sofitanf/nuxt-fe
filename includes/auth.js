import axios from 'axios';

function setHeaderToken(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

function removeHeaderToken() {
  delete axios.defaults.headers.common['Authorization'];
}

export { setHeaderToken, removeHeaderToken };
