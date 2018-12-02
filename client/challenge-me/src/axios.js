import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://94uwnllp22.execute-api.eu-central-1.amazonaws.com/production'
});

export default instance;