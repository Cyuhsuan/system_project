import axios from "axios";
import { Store } from "vuex";
import store from "./store";
const token = localStorage.getItem('token');
export default axios.create({
    baseURL: "http://laravel.test/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
    }
});

// // http request 欄截
// axios.interceptors.request.use(
//     config => {
//         config.headers = { // 如果沒有cors的問題則可以都不加
//             "Authorization": `Bearer ${store.getters.token}`,
//         };
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

// axios.interceptors.request.use(
//     config => {
//         // config.data = JSON.stringify(config.data);
//         config.headers = { // 如果沒有cors的問題則可以都不加
//             "Authorization": `Bearer ${store.getters.token}`,
//         };
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );
// // 自訂義 post and get 待研究
// export function get(url:any, params:any){    
//     return new Promise((resolve, reject) =>{        
//         axios.get(url, {            
//             params: params        
//         }).then(res => {
//             resolve(res.data);
//         }).catch(err =>{
//             reject(err.data)        
//         })    
//     });
// }
// export function post(url: string, params: any=null) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, params)
//             .then(res => {
//                 console.log('res',res)
//                 resolve(res.data);
//             })
//             .catch(err => {
//                 reject(err.data);
//             })
//     });
// }