import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backendinstagramdev.herokuapp.com/',
});

export default api;