import axios from "axios";
const token = localStorage.getItem('token');
export default axios.create({
    baseURL: "http://laravel.test/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
});
