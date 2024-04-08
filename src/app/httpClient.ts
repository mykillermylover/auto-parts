import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

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
    const login = SecureStore.getItem('userLogin');
    const pass = SecureStore.getItem('userPassword');
    return {
        login,
        pass
    };
}
