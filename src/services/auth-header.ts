export default function authHeader() {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    let user = JSON.parse(storedUser ? storedUser : "");

    if (user && token) {
        return { 
            "Authorization": 'Bearer ' + token,
            "Accept": "application/json",
            "Content-type": "application/json",
        };
    } else {
        return {};
    }
}