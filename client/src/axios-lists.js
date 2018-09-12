import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://findsport2play-ysongh.c9users.io:8081' 
});

export default instance;