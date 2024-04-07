import axios from 'axios';

const {login, pass} = Init();

const HttpClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    params: {
        userlogin: login,
        userpsw: pass
    },
    data: {
        userlogin: login,
        userpsw: pass
    }
});

export default HttpClient;

// init login and password from Storage
export function Init() {
    const login = process.env['EXPO_PUBLIC_ADMIN_LOGIN'];
    const pass = process.env['EXPO_PUBLIC_ADMIN_PASS'];
    return {
        login,
        pass
    };
}
