import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://findsport2play.herokuapp.com/' 
});

export default instance;