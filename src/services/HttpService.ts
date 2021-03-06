import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL;

class HttpService {
    post(url: string, data: any) {
        return axios({
            method: 'post',
            headers: authHeader(),
            baseURL: API_URL,
            url: url,
            data: data
        });
    }

    get(url: string, data: any) {
        return axios({
            method: 'get',
            headers: authHeader(),
            baseURL: API_URL,
            url: url,
            params: data
        });
    }


}

export default new HttpService();