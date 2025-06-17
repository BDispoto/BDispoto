import axios from 'axios';

let http = axios.create();
http.defaults.baseURL = 'http://localhost:9000'


export default {
    list() {
        return http.get('/products');
    }
}