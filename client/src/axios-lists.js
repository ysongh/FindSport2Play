import axios from 'axios';

let serverURL = 'http://localhost:8081';

if(process.env.NODE_ENV === 'production'){
    serverURL = 'https://findsport2play.herokuapp.com/';
}

const instance = axios.create({
   baseURL: serverURL
});

export default instance;