import axios from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:5001/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default client; 