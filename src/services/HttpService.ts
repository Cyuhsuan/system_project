import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://laravel.test/api/';

class HttpService {
    post(url: string, data: any) {
        return axios.post(API_URL + url, { data: data, header: authHeader() });
    }

    get(url: string, data: any) {
        return axios.post(API_URL + url, { data: data, header: authHeader() }).then((res) => {
            return res;
        })
    }

    // login(account: string, password: string) {
    //     return axios
    //         .post(API_URL + 'login', {
    //             account,
    //             password
    //         })
    //         .then(response => {
    //             if (response.data.accessToken) {
    //                 localStorage.setItem('user', JSON.stringify(response.data));
    //             }

    //             return response.data;
    //         });
    // }

    // logout() {
    //     return axios
    //         .post(API_URL + 'logout')
    //         .then(() => {
    //             localStorage.removeItem('user');
    //         });
    // }

    // register(account: string, email: string, password: string) {
    //     return axios.post(API_URL + 'register', {
    //         account,
    //         email,
    //         password
    //     });
    // }
}

export default new HttpService();