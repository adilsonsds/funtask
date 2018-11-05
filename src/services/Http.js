import axios from 'axios';

const client = axios.create({
  baseURL: 'https://funtask-server.herokuapp.com/api/v1/',
  timeout: 120000,
  headers: {
    // 'Authorization': authorizationHeader()
  }
});

export default client;
