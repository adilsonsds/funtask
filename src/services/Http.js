import axios from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:5001/api/v1/',
  timeout: 120000,
  headers: {
    // 'Authorization': authorizationHeader()
  }
});

export default client;
