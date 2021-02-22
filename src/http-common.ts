import axios from "axios";
const token = localStorage.getItem('token');
export default axios.create({
    baseURL: "http://laravel.test/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
    }
});
// 自訂義 post and get 待研究
// export function get(url:any, params:any){    
//     return new Promise((resolve, reject) =&gt;{        
//         axios.get(url, {            
//             params: params        
//         }).then(res =&gt; {
//             resolve(res.data);
//         }).catch(err =&gt;{
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