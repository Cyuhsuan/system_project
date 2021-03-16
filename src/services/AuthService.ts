import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = ;
const API_URL = process.env.VUE_APP_API_URL;

class AuthService {
    login(account: string, password: string) {
        return axios
            .post(API_URL + 'login', {
                account,
                password
            })
            .then(res => {
                if (res.data.success) {
                    const token = res.data.data.token;
                    localStorage.setItem("token", token);
                    localStorage.setItem('user', JSON.stringify(res.data.data.user));
                }

                return res.data;
            });
    }

    logout() {
        return axios({
            method: 'post',
            headers: authHeader(),
            baseURL: API_URL,
            url: 'logout'
        }).then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        });
    }

    register(account: string, email: string, password: string, c_password: string, name: string) {
        return axios.post(API_URL + 'register', {
            account,
            email,
            password,
            c_password,
            name
        });
    }
}

export default new AuthService();