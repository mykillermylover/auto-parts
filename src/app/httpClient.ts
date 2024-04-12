import axios from 'axios';

const HttpClient = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/`,
    headers: {
        'Content-Type': 'application/json'
    },
});

export default HttpClient;

export function setHttpClientUserAuthData(login: string, pass: string) {
    HttpClient.defaults.params = {
        userlogin: login,
        userpsw: pass
    };
    HttpClient.defaults.data = {
        userlogin: login,
        userpsw: pass
    };
}
