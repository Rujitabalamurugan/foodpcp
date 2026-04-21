import axios from 'axios';

const API = axios.create({
  baseURL: 'https://t4e-testserver.onrender.com/api',
  headers: {
    'password': '555393',
    'id':'E0223020',
    'set':'A'
    }
});

export default API;
