import axios from 'axios';

const HttpClient = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_API_URL}/`,
});

export default HttpClient;

export function setHttpClientUserAuthData(login: string, passwordHash: string) {
    HttpClient.defaults.params = {
        userlogin: login,
        userpsw: passwordHash
    };
}
